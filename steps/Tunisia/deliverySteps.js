const { Before, After, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { DeliveryPage } = require('../../pages/Tunisia/DeliveryPage');
const { openEyes, closeEyes, abortEyes, Target } = require('../../utils/eyesHelper');
const { startNewSession, closeSession } = require('../../utils/testEnvironment');

setDefaultTimeout(60000);

let eyes, page;

Before(async function () {
  page = await startNewSession();                 // Initialise Playwright
  this.page = page;
  this.deliveryPage = new DeliveryPage(page);     // Initialise DeliveryPage

  eyes = await openEyes(page, 'Delivery Page');   // Ouvre Applitools Eyes
});

After(async function () {
  try {
    if (eyes) await closeEyes(eyes);             // Ferme Applitools proprement
    await closeSession();                        // Ferme la session Playwright
  } catch (err) {
    console.warn('⚠️ Error closing session:', err.message);
    if (eyes) await abortEyes(eyes);
  }
});

When('I close the popup', async function () {
  await this.deliveryPage.closePopupIfVisible();
});

When('I click on the user icon', async function () {
  await this.deliveryPage.clickUserIcon();
});

When('I click on "My account"', async function () {
  await this.deliveryPage.clickMyAccount();
});

When('I click on "DELIVERY ADDRESS"', async function () {
  await this.deliveryPage.clickDeliveryAddressTab();
  await eyes.check('Delivery Page After Tab Click', Target.window().fully());
});

Then('I should see a delivery address table', async function () {
  await this.deliveryPage.assertTableIsVisible();
  await eyes.check('Delivery Table Visible', Target.region('#page-length-option'));
});

Then('every row in the table should have valid address data and not empty', async function () {
  await this.deliveryPage.validateAllRowsHaveData();
  await eyes.check('Valid Delivery Table Rows', Target.region('#page-length-option'));
});
