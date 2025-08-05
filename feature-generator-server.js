const express = require('express');
const path = require('path');
const { generateFeatureFromText } = require('./generateFeatureFromText');

const app = express();
const PORT = 4322;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/generate', async (req, res) => {
  const { requirement, filename } = req.body;

  if (!requirement.trim()) {
    return res.json({ message: '❌ Please enter a requirement.' });
  }

  try {
    await generateFeatureFromText(requirement, filename || 'generated.feature');
    res.json({ message: `✅ Feature file '${filename}' generated successfully!` });
  } catch (error) {
    console.error(error);
    res.json({ message: '❌ Error generating feature file.' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Feature Generator running at http://localhost:${PORT}`);
});
