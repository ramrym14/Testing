const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { DeliveryAddButtonPage } = require('../../pages/Tunisia/DeliveryAddButtonPage');
const { addButton } = require('../../ressources/Tunisia/DeliveryAddButtonSelectors');
const { openEyes, closeEyes, abortEyes, Target } = require('../../utils/eyesHelper');

let eyes;

Before(async function () {
  eyes = await openEyes(this.page, 'Delivery Address Flow');
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

Given('I am on the delivery address section', async function () {
  console.log('✅ Assuming we are already on the Delivery Address section (hook did it)');
  this.deliveryAddPage = new DeliveryAddButtonPage(this.page, eyes);

await eyes.check('Delivery Address Section', Target.window().ignoreRegions())
});

Then('I should see the {string} button', async function (buttonText) {
  const isVisible = await this.deliveryAddPage.isAddButtonVisible();
  if (!isVisible) throw new Error(`❌ ${buttonText} button is not visible but it should be.`);
  await eyes.check(`${buttonText} button visible`, Target.window());
});

When('I select {string}', async function (country) {
  await this.deliveryAddPage.selectCountry(country);
  await eyes.check(`Country Selected: ${country}`,  Target.window().ignoreRegions());
});

Then('the {string} button should {word} visible', async function (buttonText, expected) {
  const isVisible = await this.deliveryAddPage.isAddButtonVisible();
  if ((expected === 'not' && isVisible) || (expected !== 'not' && !isVisible)) {
    throw new Error(`❌ ${buttonText} button visibility mismatch. Expected: ${expected}`);
  }
  await eyes.check(`${buttonText} visibility = ${expected}`,  Target.window().ignoreRegions());
});

Then('the {string} button should {word} enabled', async function (buttonText, expected) {
  const isEnabled = await this.deliveryAddPage.isAddButtonEnabled();
  if ((expected === 'not' && isEnabled) || (expected !== 'not' && !isEnabled)) {
    throw new Error(`❌ ${buttonText} button enablement mismatch. Expected: ${expected}`);
  }
  await eyes.check(`${buttonText} enablement = ${expected}`,  Target.window().ignoreRegions());
});

When('I click on the {string} button', async function (buttonText) {
  await this.deliveryAddPage.clickAddButton();
  await eyes.check(`Clicked on ${buttonText} button`,  Target.window().ignoreRegions());
});

Then('the Add Address modal should {word} open', async function (expected) {
  const isModalOpen = await this.deliveryAddPage.isModalOpen();
  this.modalExpectedOpen = expected !== 'not';

  if ((expected === 'not' && isModalOpen) || (expected !== 'not' && !isModalOpen)) {
    throw new Error(`❌ Modal open state mismatch. Expected: ${expected}`);
  }

  await eyes.check(`Modal open = ${expected}`,  Target.window().ignoreRegions());
});

When('I fill the Add Address form with {string}', async function (formType) {
  if (!this.modalExpectedOpen) {
    console.log('⚠️ Modal not open, skipping form filling.');
    return;
  }

  if (formType === 'valid') {
    await this.deliveryAddPage.fillDeliveryForm();
    await eyes.check('Form Filled - Valid Data', Target.window().ignoreRegions());
  } else if (formType === 'invalid') {
    await this.deliveryAddPage.fillInvalidDeliveryForm();
    await eyes.check('Form Filled - Invalid Data',  Target.window().ignoreRegions());
  }
});

When('I click on "REGISTER"', async function () {
  if (!this.modalExpectedOpen) {
    console.log('⚠️ Modal not open, skipping click REGISTER.');
    return;
  }
  await this.deliveryAddPage.submitDeliveryForm();
  await eyes.check('Clicked Register',  Target.window().ignoreRegions());
});

Then('the address should be {string}', async function (creationStatus) {
  if (!this.modalExpectedOpen) {
    console.log('⚡ Modal not open, skipping address creation validation.');
    return;
  }

  if (creationStatus === 'success') {
    console.log('✅ Expecting SUCCESS address creation.');
    await this.page.waitForTimeout(3000);
    await this.deliveryAddPage.takeScreenshot('address-created-success');
    await eyes.check('Address Creation Success',  Target.window().ignoreRegions());
  } else if (creationStatus === 'error') {
    console.log('🚫 Expecting address creation ERROR.');
    await this.page.waitForTimeout(2000);

    const addressError = await this.page.isVisible('text="Please enter your address!"');
    const phoneError = await this.page.isVisible('text="Too short"');

    if (!addressError && !phoneError) {
      throw new Error('❌ Expected form error messages but not found.');
    }

    console.log(`✅ Detected form errors (Address Error=${addressError}, Phone Error=${phoneError})`);
    await this.deliveryAddPage.takeScreenshot('address-creation-error');
    await eyes.check('Address Creation Error (Validation)',  Target.window().ignoreRegions());
  } else if (creationStatus === 'skipped') {
    console.log('⚡ Skipped address creation check (modal not opened).');
  }
});
