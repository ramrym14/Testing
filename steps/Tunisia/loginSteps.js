const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/Tunisia/LoginPage');

let loginPage;

Given('I am on the login page', async function () {
  loginPage = new LoginPage(this.page);
  await loginPage.navigate();
});

When('I login using username {string} and password {string}', async function (username, password) {
  await loginPage.login(username, password);
});

Then('I should see {string} and {string}', async function (result, message) {
  this.result = result;
  this.message = message;

  if (result === 'dashboard') {
    await this.page.waitForURL('**/dashboard', { timeout: 5000 });
    console.log('✅ Successfully reached dashboard');
  } else if (result === 'error') {
    const errorBox = this.page.locator('div.card-content.white-text');
    await expect(errorBox).toBeVisible({ timeout: 5000 });

    if (message) {
      const actualText = await errorBox.textContent();
      expect(actualText.trim()).toContain(message);
    }
  } else {
    throw new Error(`❌ Unknown result: "${result}"`);
  }
});

Then('the country flag icon should be {string}', async function (flagClass) {
  if (this.result === 'dashboard') {
    await loginPage.checkCountryFlag(flagClass, true);
  } else {
    await loginPage.checkCountryFlag(flagClass, false);
  }
});


