const fs   = require('fs');
const path = require('path');
const {
  Before,
  After,
  AfterStep,
  setDefaultTimeout,
  Status
} = require('@cucumber/cucumber');
const { startNewSession, closeSession } = require('../utils/testEnvironment');
const { openEyes, closeEyes, abortEyes } = require('../utils/eyesHelper');
const { analyzeFailureWithAI, suggestSelectorFix } = require('../utils/aiFailureHandler');

setDefaultTimeout(60 * 1000);

let sessionCount = 0;

// ✅ Before each scenario: start a new browser session (with auto login)
Before(async function (scenario) {
  sessionCount++;
  console.log(`\n📂 Starting session #${sessionCount} for scenario: ${scenario.pickle.name}`);

  try {
    // 💡 Safe check for Scenario Outline or steps with data tables
    const firstStep = scenario?.pickle?.steps?.[0];
    const hasRows = firstStep?.argument && Array.isArray(firstStep.argument.rows);

    if (hasRows) {
      console.log('✅ This scenario uses a data table:', firstStep.argument.rows);
      // Do something with rows if needed
    }

    this.page = await startNewSession(true);
  } catch (error) {
    console.error('❌ Error during session start:', error.message);
    this.page = undefined;
  }
});


AfterStep(async function ({ result, pickle }) {
  if (result.status === Status.FAILED && this.page && !this.page.isClosed?.()) {
    // 1️⃣ Take screenshot
    const safeName       = pickle.name.replace(/[^a-zA-Z0-9]/g, '_') + `_${Date.now()}`;
    const screenshotPath = path.join('images', 'failures', `${safeName}.png`);
    fs.mkdirSync(path.dirname(screenshotPath), { recursive: true });
    await this.page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`🖼️ [AfterStep] Screenshot saved to: ${screenshotPath}`);

    // 2️⃣ Grab any visible UX error text
    let uxText = '';
    for (const sel of [
      '.card-alert',
      '.alert-danger',
      '.swal-text',
      '.toast-message',
      '.error-message',
      '.notification-error'
    ]) {
      try {
        const loc = this.page.locator(sel);
        if (await loc.isVisible({ timeout: 300 })) {
          uxText = (await loc.innerText()).trim();
          break;
        }
      } catch {}
    }

    // 3️⃣ Run AI classification with screenshot + logs + UX
    const errorLog = result.message || 'No error message provided';
    const failureDetails = await analyzeFailureWithAI(errorLog, {
      username: this.username || 'Unknown',
      testName: pickle.name,
      expectedBehavior: 'Expected successful step execution',
      uxText,
      screenshotPath
    });

    console.log('🧠 Failure Classified As:', failureDetails.type);
    console.log('📖 Explanation:', failureDetails.explanation);

    // 4️⃣ Optional: if it’s a selector error, ask for a fix
    if (failureDetails.type === 'SelectorError') {
      const html = await this.page.content().catch(() => 'DOM unavailable');
      const fix  = await suggestSelectorFix(failureDetails.selector, html);
      console.log('🔧 Suggested Fix:', fix);
    }
  }
});

// ——————————————————————————————————————
// After: just clean up (Applitools + browser)
// ——————————————————————————————————————
After(async function ({ result }) {
  const isFailed = result.status === Status.FAILED;

  // Applitools cleanup
  if (this.eyes) {
    if (isFailed) await abortEyes(this.eyes);
    else          await closeEyes(this.eyes);
  }

  // Finally close the browser
  await closeSession(true);
  console.log(`✅ Session #${sessionCount} closed after ${isFailed ? 'failure analysis' : 'success'}`);
});