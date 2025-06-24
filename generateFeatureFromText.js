const http = require('http');
const fs = require('fs');

async function generateFeatureFromText(text, fileName = 'generated.feature') {
  const prompt = `
You are a QA engineer. Convert the following test requirements into Gherkin BDD .feature file format for Playwright with CucumberJS:

${text}
`;

  const postData = JSON.stringify({
    model: "mistral", // or any locally pulled model like llama3, codellama, etc.
    stream: false,
    messages: [
      { role: "system", content: "You write Gherkin BDD feature files for QA." },
      { role: "user", content: prompt }
    ]
  });

  const options = {
    hostname: 'localhost',
    port: 11434,
    path: '/api/chat',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const req = http.request(options, res => {
    let rawData = '';
    res.on('data', chunk => rawData += chunk);
    res.on('end', () => {
      const result = JSON.parse(rawData);
      const content = result.message?.content || '';
      fs.writeFileSync(`./features/Ai-Try/${fileName}`, content);
      console.log(`✅ .feature file saved to features/Ai-Try/${fileName}`);
    });
  });

  req.on('error', error => {
    console.error('❌ Error:', error.message);
  });

  req.write(postData);
  req.end();
}

module.exports = { generateFeatureFromText };
