const http = require('http');

const scenarios = [
  {
    name: 'Verify ADD button behavior and address form outcome by selected country',
    tags: ['@add', '@high'],
    file: 'features/AddDeliveryAddress.feature'
  },
  {
    name: 'Modify an address using various data inputs and verify the outcome',
    tags: ['@modify', '@medium'],
    file: 'features/ModifyDeliveryAdress.feature'
  },
  {
    name: 'Try to delete delivery addresses from different cases',
    tags: ['@delete', '@low'],
    file: 'features/DeleteDeliveryAdress.feature'
  } 

];


// Build the prompt to send to Ollama
const prompt = `
You are an expert QA assistant.

Here is a list of test scenarios, each with tags like @add, @modify, @delete and priority tags like @high, @medium, @low.

Your job:
1. Rank the scenarios from highest to lowest priority.
2. Justify the ranking briefly.
3. Return a JSON array in this format:
[
  { "name": "scenario name", "priority": "HIGH", "reason": "..." },
  ...
]

Scenarios:
${JSON.stringify(scenarios, null, 2)}
`;

const data = JSON.stringify({
  model: 'mistral',  
  prompt: prompt,
  stream: false
});

const req = http.request({
  hostname: 'localhost',
  port: 11434,
  path: '/api/generate',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  }
}, res => {
  let body = '';
  res.on('data', chunk => { body += chunk; });
  res.on('end', () => {
    try {
      const lines = body.trim().split('\n').filter(Boolean);
      const lastLine = lines[lines.length - 1];
      const parsed = JSON.parse(lastLine);

      console.log('\n🧠 Ollama AI Response:\n');
      console.log(parsed.response);

      // ✅ Extract only the JSON part from the full response
      const match = parsed.response.match(/\[\s*{[\s\S]*?}\s*\]/);
      if (match) {
        const jsonArray = match[0];
        fs.writeFileSync('prioritized.json', jsonArray, 'utf-8');
        console.log('\n📁 File saved: prioritized.json');
      } else {
        console.error('❌ Could not extract valid JSON array from Ollama response.');
      }

    } catch (err) {
      console.error('❌ Error parsing Ollama response:', err.message);
      console.error(body);
    }
  });
});

req.write(data);
req.end();