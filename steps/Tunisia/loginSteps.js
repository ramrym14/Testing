const { Before, After, Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { startNewSession, closeSession } = require('../../utils/testEnvironment');
const { LoginPage } = require('../../pages/Tunisia/LoginPage');
const { openEyes, closeEyes, abortEyes, Target } = require('../../utils/eyesHelper');
const { errorBox } = require('../../ressources/Tunisia/loginSelectors');

require('dotenv').config();
setDefaultTimeout(60000);

let page, loginPage, eyes;

Before(async () => {
  page = await startNewSession();
  loginPage = new LoginPage(page);
});

After(async () => {
  try {
    if (eyes) {
      await closeEyes(eyes);
    }
    await closeSession();
  } catch (err) {
    console.warn('⚠️ Error during session close:', err.message);
    if (eyes) await abortEyes(eyes);
  }
});

Given('I am on the login page', async function () {
  await loginPage.navigate();
  eyes = await openEyes(page, 'Login Page');
  await eyes.check('Login Page UI', Target.window().fully());
});

When('I login using username {string} and password {string}', async function (username, password) {
  await loginPage.login(username, password);
});

Then('I should see {string} and {string}', async function (result, message) {
  if (result === 'dashboard') {
    await loginPage.waitForDashboard();
    await eyes.check('Dashboard UI', Target.window().fully());
  } else if (result === 'error') {
    const errorBoxLocator = await page.locator(errorBox);
    await errorBoxLocator.waitFor({ state: 'visible', timeout: 5000 });
    await loginPage.takeScreenshot('error-visible');

    const actualMessage = await errorBoxLocator.innerText();
    console.log('🔍 Error message found:', actualMessage);

    await eyes.check('Error Message UI', Target.region(errorBoxLocator));

    if (!actualMessage.includes(message)) {
      throw new Error(`Expected: "${message}", but got: "${actualMessage}"`);
    }
  } else {
    throw new Error(`Unknown result value: "${result}"`);
  }
});
