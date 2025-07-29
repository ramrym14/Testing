// serve-failure-popup.js
const express = require('express');
const fs = require('fs');
const open = require('openurl');

const path = require('path');

function serveFailurePopup(data) {
  const app = express();
  const port = 4321;

  // Serve static images (e.g., screenshots)
  app.use('/images', express.static(path.join(__dirname, 'images')));

  app.get('/', (req, res) => {
    const { testName, type, explanation, screenshotPath } = data;

    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>🧠 AI Test Failure - ${testName}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 2rem;
            background: #111;
            color: #f8f8f8;
          }
          h1 { color: #ff5e5e; }
          .type { font-size: 1.2rem; margin: 1rem 0; color: #ffd166; }
          .explanation { background: #222; padding: 1rem; border-radius: 6px; white-space: pre-line; }
          img { margin-top: 1rem; max-width: 90%; border-radius: 6px; box-shadow: 0 0 10px #000; }
        </style>
      </head>
      <body>
        <h1>💥 AI Failure Analysis</h1>
        <p><strong>Test:</strong> ${testName}</p>
        <p class="type"><strong>Type:</strong> ${type}</p>
        <div class="explanation">
          <strong>Explanation:</strong><br>${explanation}
        </div>
        ${screenshotPath ? `<img src="${screenshotPath.replace(/\\/g, '/')}" alt="Failure Screenshot">` : ''}
      </body>
      </html>
    `);
  });

  app.listen(port, () => {
    console.log(`🌐 AI failure popup running at http://localhost:${port}`);
    open(`http://localhost:${port}`);
  });
}

module.exports = { serveFailurePopup };
