const { Eyes, VisualGridRunner, Configuration, BatchInfo, Target } = require('@applitools/eyes-playwright');
require('dotenv').config();

const runner = new VisualGridRunner({ testConcurrency: 5 });

const configuration = new Configuration();
configuration.setApiKey(process.env.APPLITOOLS_API_KEY);
configuration.setAppName('Arvea Login App');
configuration.setBatch(new BatchInfo(process.env.APPLITOOLS_BATCH_NAME || "BDD Login Batch"));

async function openEyes(page, testName) {
  const eyes = new Eyes(runner);
  eyes.setConfiguration(configuration);
  await eyes.open(page, 'Arvea Login App', testName);
  return eyes;
}

async function closeEyes(eyes) {
  await eyes.closeAsync();
}

async function abortEyes(eyes) {
  await eyes.abortIfNotClosed();
}

module.exports = {
  openEyes,
  closeEyes,
  abortEyes,
  Target
};
