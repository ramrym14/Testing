const express = require("express");
const client = require("prom-client");
const fs = require("fs");
const path = require("path");

const app = express();
const register = client.register;

const passedGauge = new client.Gauge({ name: 'tests_passed', help: 'Passed tests' });
const failedGauge = new client.Gauge({ name: 'tests_failed', help: 'Failed tests' });
const skippedGauge = new client.Gauge({ name: 'tests_skipped', help: 'Skipped tests' });
const durationGauge = new client.Gauge({ name: 'tests_duration_seconds', help: 'Total test duration in seconds' });

function parseCucumberReport() {
  const reportPath = path.join(__dirname, "report", "cucumber-report.json");

  if (!fs.existsSync(reportPath)) {
    console.error("❌ cucumber-report.json not found at:", reportPath);
    return;
  }

  let data;

  try {
    data = JSON.parse(fs.readFileSync(reportPath, "utf8"));
  } catch (err) {
    console.error("❌ Failed to parse cucumber-report.json:", err.message);
    return;
  }

  let passed = 0, failed = 0, skipped = 0, duration = 0;

  try {
    data.forEach(feature => {
      feature.elements?.forEach(scenario => {
        let scenarioFailed = false;

        scenario.steps?.forEach(step => {
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
  } catch (err) {
    console.error("❌ Error while processing report data:", err.message);
    return;
  }

  // Set gauges with correct numeric values
  passedGauge.set(passed);
  failedGauge.set(failed);
  skippedGauge.set(skipped);
  durationGauge.set(duration);

  console.log(`✅ Metrics updated → Passed: ${passed}, Failed: ${failed}, Skipped: ${skipped}, Duration: ${duration.toFixed(2)}s`);
}

// Initial parse at startup
parseCucumberReport();

// Refresh metrics every 30 seconds
setInterval(() => {
  try {
    parseCucumberReport();
  } catch (err) {
    console.error("❌ Unexpected error while updating metrics:", err.message);
  }
}, 30 * 1000);

// Expose metrics endpoint
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`🚀 Exporter listening at http://localhost:${PORT}/metrics`);
});
