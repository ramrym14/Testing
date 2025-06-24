const { Given, When, Then, Before, After } = require('@cucumber/cucumber');

const { ModifyDeliveryAddressPage } = require('../../pages/Tunisia/ModifyDeliveryPage');
const { openEyes, closeEyes, abortEyes, Target } = require('../../utils/eyesHelper');

let eyes;

Before(async function () {
  eyes = await openEyes(this.page, ' Modify Delivery Address ');
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
Given('I am on the modify delivery address section', async function () {
  console.log('✅ Assuming we are already on the Delivery Address section (hook did it)');
  this.modifyDeliveryPage = new ModifyDeliveryAddressPage(this.page);
  
  await eyes.check('Delivery Address Section', Target.window().ignoreRegions())
});

When('I select country {string}', async function (country) {
  await this.modifyDeliveryPage.selectCountry(country);
  
  await eyes.check('select country', Target.window().ignoreRegions())
});

When('I click on the edit icon of an address', async function () {
  await this.modifyDeliveryPage.clickEditIcon();
  
  await eyes.check('click edit ', Target.window().ignoreRegions())
});

Then('the Modify delivery address modal should open', async function () {
  const isOpen = await this.modifyDeliveryPage.isModifyModalOpen();
  if (!isOpen && !this.modifyDeliveryPage.shouldSkip) {
    throw new Error('❌ Modify Address modal did not open.');
  }
  if (isOpen) {
    console.log('✅ Modify Address modal is open.');
  }
});

When('I fill the Modify Address form with:', async function (dataTable) {
  const data = dataTable.hashes()[0];
  const phoneInput = data.phoneInput || '';
  const addressInput = data.addressInput || '';
  await this.modifyDeliveryPage.fillModifyForm(phoneInput, addressInput);
  
  await eyes.check('fill the Modify Address form', Target.window().ignoreRegions())
});

When('I click on "REGISTER" from modify modal', async function () {
  await this.modifyDeliveryPage.clickRegisterButton();
  await eyes.check('click register button ', Target.window().ignoreRegions())
});

Then('I should see the messages from modify modal:', async function (dataTable) {
  const expectedMessages = dataTable.raw().flat().filter(msg => msg.trim() !== '');
  if (expectedMessages.length === 0) {
    console.warn('⚠️ No messages provided to verify.');
    return;
  }
  await this.modifyDeliveryPage.verifyMessages(expectedMessages);
  await eyes.check('msg ', Target.window().ignoreRegions())
});

