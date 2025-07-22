const fs = require("fs");
const path = require("path");
const express = require("express");
const client = require("prom-client");

const app = express();
const register = client.register;

const passedGauge = new client.Gauge({ name: 'tests_passed', help: 'Passed tests' });
const failedGauge = new client.Gauge({ name: 'tests_failed', help: 'Failed tests' });
const skippedGauge = new client.Gauge({ name: 'tests_skipped', help: 'Skipped tests' });
const durationGauge = new client.Gauge({ name: 'tests_duration_seconds', help: 'Total test duration in seconds' });

function parseCucumberReport() {
  const reportPath = path.join(__dirname, "report", "cucumber-report.json");

  if (!fs.existsSync(reportPath)) {
    console.error("❌ cucumber-report.json not found at", reportPath);
    return;
  }

  let data;
  try {
    const raw = fs.readFileSync(reportPath, "utf8").trim();
    if (!raw) throw new Error("File is empty");
    data = JSON.parse(raw);
  } catch (err) {
    console.error("❌ Failed to parse cucumber-report.json:", err.message);
    return;
  }

  let passed = 0, failed = 0, skipped = 0, duration = 0;

  data.forEach(feature => {
    if (!feature.uri.includes("Countries/")) return; // 🚩 Filter only Countries

    feature.elements?.forEach(scenario => {
      let scenarioFailed = false;

      scenario.steps.forEach(step => {
        if (step.result.status === "failed") scenarioFailed = true;
        if (step.result.status === "skipped") skipped++;
        if (step.result.duration) duration += step.result.duration / 1e9; // ns → s
      });

      if (scenarioFailed) {
        failed++;
      } else {
        passed++;
      }
    });
  });

  passedGauge.set(passed);
  failedGauge.set(failed);
  skippedGauge.set(skipped);
  durationGauge.set(duration.toFixed(2));

  console.log(`✅ Metrics updated → Passed: ${passed}, Failed: ${failed}, Skipped: ${skipped}, Duration: ${duration.toFixed(2)}s`);
}

// 🕒 Update metrics every 30s
setInterval(() => {
  parseCucumberReport();
}, 30 * 1000);

// Expose metrics
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

app.listen(8000, '0.0.0.0', () => {
  console.log(`🚀 Exporter listening at http://0.0.0.0:8000/metrics`);
});
