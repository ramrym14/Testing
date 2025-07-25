// metrics-server.js
const http = require('http');
const client = require('prom-client');

// collect Node.js default metrics (memory, CPU, GC, etc.)
client.collectDefaultMetrics();

const server = http.createServer(async (req, res) => {
  if (req.url === '/metrics') {
    res.setHeader('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
  } else {
    res.statusCode = 404;
    res.end('Not found');
  }
});

// listen on all interfaces so Prometheus can reach it
server.listen(8000, '0.0.0.0', () =>
  console.log('⚙️  Metrics server listening on 0.0.0.0:8000')
);
