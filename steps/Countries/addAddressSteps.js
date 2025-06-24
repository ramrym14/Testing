const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { DeliveryAddButtonPage } = require('../../pages/Countries/AddDeliveryAddressPage');
const { openEyes, closeEyes, abortEyes, Target } = require('../../utils/eyesHelper');

let eyes;
let deliveryPage;

Before(async function () {
  eyes = await openEyes(this.page, 'Delivery Address Flow');
   this.eyes = eyes; 
});

After(async function () {
  if (eyes) {
    try {
      await closeEyes(eyes);
    } catch (error) {
      console.warn('⚠️ Closing Eyes failed, trying abort...');
      await abortEyes(eyes);
    }
  }
});


Then('I should see the {string} button', async function (buttonText) {
  const isVisible = await this.deliveryAddPage.isAddButtonVisible();
  if (!isVisible) throw new Error(`❌ ${buttonText} button is not visible but it should be.`);
  await eyes.check(`${buttonText} button visible`, Target.window());
});

When('I select {string}', async function (country) {
  await this.deliveryAddPage.selectCountry(country);
  await eyes.check(`Country Selected: ${country}`, Target.window().ignoreRegions());
});

Then('the {string} button should {word} visible', async function (buttonText, expected) {
  const isVisible = await this.deliveryAddPage.isAddButtonVisible();
  if ((expected === 'not' && isVisible) || (expected !== 'not' && !isVisible)) {
    throw new Error(`❌ ${buttonText} button visibility mismatch. Expected: ${expected}`);
  }
  await eyes.check(`${buttonText} visibility = ${expected}`, Target.window().ignoreRegions());
});

Then('the {string} button should {word} enabled', async function (buttonText, expected) {
  const isEnabled = await this.deliveryAddPage.isAddButtonEnabled();
  if ((expected === 'not' && isEnabled) || (expected !== 'not' && !isEnabled)) {
    throw new Error(`❌ ${buttonText} button enablement mismatch. Expected: ${expected}`);
  }
  await eyes.check(`${buttonText} enablement = ${expected}`, Target.window().ignoreRegions());
});

When('I click on the {string} button', async function (buttonText) {
  await this.deliveryAddPage.clickAddButton();
  await eyes.check(`Clicked on ${buttonText} button`, Target.window().ignoreRegions());
});

Then('the Add Address modal should {word} open', async function (expected) {
  const isModalOpen = await this.deliveryAddPage.isModalOpen();
  this.modalExpectedOpen = expected !== 'not';
  if ((expected === 'not' && isModalOpen) || (expected !== 'not' && !isModalOpen)) {
    throw new Error(`❌ Modal open state mismatch. Expected: ${expected}`);
  }
  await eyes.check(`Modal open = ${expected}`, Target.window().ignoreRegions());
});

When('I fill the Add Address form with {string}', async function (formType) {
  if (!this.modalExpectedOpen) {
    console.log('⚠️ Modal not open, skipping form filling.');
    return;
  }
  await this.deliveryAddPage.fillForm(formType);
  await eyes.check(`Form Filled - ${formType}`, Target.window().ignoreRegions());
});

When('I click on "REGISTER"', async function () {
  if (!this.modalExpectedOpen) {
    console.log('⚠️ Modal not open, skipping click REGISTER.');
    return;
  }
  await this.deliveryAddPage.submitForm();
  await eyes.check('Clicked Register', Target.window().ignoreRegions());
});

Then('the address should be {string}', async function (creationStatus) {
  if (!this.modalExpectedOpen) {
    console.log('⚡ Modal not open, skipping address creation validation.');
    return;
  }

  if (creationStatus === 'success') {
    console.log('✅ Expecting SUCCESS address creation.');
    const popup = this.page.locator('.swal-modal');
    await popup.waitFor({ state: 'visible', timeout: 5000 });
    const popupText = await popup.innerText();
    this.actualMessages = [popupText.trim()];
    console.log(`✅ Detected success popup message: ${popupText.trim()}`);
    const ok = this.page.locator('.swal-button');
    if (await ok.isVisible()) await ok.click();
    await eyes.check('Address Creation Success', Target.window().ignoreRegions());

  }else if (creationStatus === 'error') {
  console.log('🚫 Expecting address creation ERROR.');
  await this.page.waitForTimeout(500);

  // Collect error messages individually
  this.actualMessages = [];

  const selectorsToCheck = [
    'text=Please enter your address!',
    'text=Please enter your street',
    'text=Please select your city',
    'text=Please enter your house / building number',
    'text=Please enter your building / villa name or number',
    'text=Too short',
    'text=Too long',
  ];

  for (const sel of selectorsToCheck) {
    const locator = this.page.locator(sel);
    if (await locator.isVisible()) {
      this.actualMessages.push(await locator.innerText());
    }
  }

  if (this.actualMessages.length === 0) {
    throw new Error('❌ Expected form error messages but none were found.');
  }

  console.log(`✅ Detected error messages: ${this.actualMessages.join(' | ')}`);
  await eyes.check('Address Creation Error (Validation)', Target.window().ignoreRegions());

  } else if (creationStatus === 'skipped') {
    console.log('⚡ Skipped address creation check (modal not opened).');
    this.actualMessages = [];
  }
});

Then('I should see the messages:', async function (dataTable) {
  // DataTable may contain comma-separated messages in one cell
  const expectedCells = dataTable.raw().flat();
  // Split each cell by comma and trim whitespace
  const expectedMessages = expectedCells
    .flatMap(cell => cell.split(',').map(msg => msg.trim()))
    .filter(msg => msg.length > 0);

  const actualMessages = this.actualMessages || [];

  for (const expected of expectedMessages) {
    const match = actualMessages.some(msg => msg.includes(expected));
    if (!match) {
      throw new Error(`❌ Expected message not found: "${expected}". Found messages: ${actualMessages.join(' | ')}`);
    }
  }

  console.log(`✅ All expected messages found: ${expectedMessages.join(', ')}`);
});
