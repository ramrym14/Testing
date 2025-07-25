// metrics-server.js
const http   = require('http');
const fs     = require('fs');
const path   = require('path');
const client = require('prom-client');

// — 1) Collect default Node.js metrics (CPU, memory, GC, etc.)
client.collectDefaultMetrics();

// — 2) Define your custom Cucumber gauges
const passedGauge   = new client.Gauge({ name: 'tests_passed',          help: 'Passed tests' });
const failedGauge   = new client.Gauge({ name: 'tests_failed',          help: 'Failed tests' });
const skippedGauge  = new client.Gauge({ name: 'tests_skipped',         help: 'Skipped tests' });
const durationGauge = new client.Gauge({ name: 'tests_duration_seconds', help: 'Total test duration in seconds' });

function parseCucumberReport() {
  const reportPath = path.join(__dirname, 'report', 'cucumber-report.json');
  if (!fs.existsSync(reportPath)) {
    console.error('❌ cucumber-report.json not found at', reportPath);
    return;
  }

  let data;
  try {
    const raw = fs.readFileSync(reportPath, 'utf8').trim();
    if (!raw) throw new Error('File is empty');
    data = JSON.parse(raw);
  } catch (err) {
    console.error('❌ Failed to parse cucumber-report.json:', err.message);
    return;
  }

  let passed = 0, failed = 0, skipped = 0, duration = 0;
  data.forEach(feature => {
    if (!feature.uri.includes('Countries/')) return;
    feature.elements?.forEach(scenario => {
      let scenarioFailed = false;
      scenario.steps.forEach(step => {
        if (step.result.status === 'failed')  scenarioFailed = true;
        if (step.result.status === 'skipped') skipped++;
        if (step.result.duration)           duration += step.result.duration / 1e9;
      });
      scenarioFailed ? failed++ : passed++;
    });
  });

  passedGauge.set(passed);
  failedGauge.set(failed);
  skippedGauge.set(skipped);
  durationGauge.set(duration);
  console.log(`✅ Cucumber metrics → passed=${passed} failed=${failed} skipped=${skipped} duration=${duration.toFixed(2)}s`);
}

// Run immediately, then every 30s
parseCucumberReport();
setInterval(parseCucumberReport, 30 * 1000);

// — 3) Serve everything on a single HTTP server
const server = http.createServer(async (req, res) => {
  if (req.url === '/metrics') {
    res.setHeader('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
  } else {
    res.statusCode = 404;
    res.end('Not found');
  }
});

server.listen(8000, '0.0.0.0', () =>
  console.log('🚀 Unified exporter listening on http://0.0.0.0:8000/metrics')
);
