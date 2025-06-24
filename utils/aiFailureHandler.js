// 📦 Native HTTP for local Ollama API (no axios needed)
const http = require('http');
const fs = require('fs');

// 🧠 Function to analyze and classify test failure using Ollama locally
module.exports.analyzeFailureWithAI = async function (errorLog, context = {}) {
  if (!errorLog) {
    return {
      type: 'Unknown',
      explanation: 'No error log provided.'
    };
  }

  const {
    username = 'Unknown',
    testName = 'Unnamed Scenario',
    expectedBehavior = 'Not specified',
    uxText = 'No visible UI message detected.',
    domSnapshot = 'No DOM context provided.',
      screenshotPath = ''
  } = context;

  const prompt = `You are an expert QA analyst. Your task is to analyze Playwright test failures using backend logs, frontend UX messages, and the DOM. If the UX shows a login error like \'Incorrect credentials\' and the error log shows a timeout, classify as type: DataError and keep all timeout-related explanation.

Respond in strict JSON:
{
  "type": "<DataError | SelectorError | Timeout | UIError | LogicError | Other>",
  "explanation": [
    "<short summary of the problem>",
    "<correlation of log and UX>",
    "<suggested fix>"
  ]
}

--- Test Metadata ---
Username: ${username}
Test Name: ${testName}
Expected Behavior: ${expectedBehavior}
Saved Screenshot Path: ${screenshotPath || 'No screenshot available'}
--- Frontend UI Message ---
${uxText}

--- DOM Snapshot ---
${domSnapshot}

--- Error Log ---
${errorLog}`;

  try {
    const result = await fetchFromOllama('mistral', prompt);
    console.log('🤖 Ollama raw response:\n', result);
    fs.writeFileSync('ollama-last-response.txt', result);

    const parsed = JSON.parse(result);

    return {
      type: parsed.type?.trim() || 'Unclassified',
      explanation: Array.isArray(parsed.explanation)
        ? parsed.explanation.join('\n- ')
        : parsed.explanation?.trim() || result.trim()
    };
  } catch (err) {
    return {
      type: 'OllamaError',
      explanation: `Failed to analyze with Ollama: ${err.message}`
    };
  }
};

// 🔧 Suggest selector fix using local Ollama
module.exports.suggestSelectorFix = async function (brokenSelector, htmlContext) {
  const prompt = `You are a Playwright automation assistant. A selector failed in the test:
"${brokenSelector}"
Here is the HTML context:

${htmlContext}

Suggest a corrected Playwright selector.`;

  try {
    const result = await fetchFromOllama('mistral', prompt);
    console.log('🔧 Selector suggestion raw output:', result);
    return result.trim();
  } catch (error) {
    return `❌ Failed to suggest selector fix: ${error.message}`;
  }
};

// 📡 Generic function to query Ollama locally
async function fetchFromOllama(model, prompt) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ model, prompt, format: 'json' });

    const req = http.request(
      {
        hostname: 'localhost',
        port: 11434,
        path: '/api/generate',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(body)
        }
      },
      res => {
        let buffer = '';

        res.on('data', chunk => {
          buffer += chunk.toString();
        });

        res.on('end', () => {
          try {
            const lines = buffer.trim().split('\n');
            const merged = lines.map(line => {
              try {
                return JSON.parse(line).response || '';
              } catch {
                return '';
              }
            }).join('').trim();

            resolve(merged);
          } catch (err) {
            reject(new Error('Invalid response from Ollama'));
          }
        });
      }
    );

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}
