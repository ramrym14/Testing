const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { DeleteDeliveryAddressPage } = require('../../pages/Tunisia/DeleteDeliveryAddressPage');

const { openEyes, closeEyes, abortEyes, Target } = require('../../utils/eyesHelper');

let eyes;

Before(async function () {
  eyes = await openEyes(this.page, 'Delete Delivery Address');
  this.eyes = eyes;
  this.deletePage = new DeleteDeliveryAddressPage(this.page); // ✅ Init page object here
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



Given('I switch to country {string} if needed', async function (country) {
  this.deletePage = new DeleteDeliveryAddressPage(this.page);
  await this.deletePage.selectCountry(country); // ✅ correction ici
   await eyes.check('switch to country ', Target.window().ignoreRegions())
});


Given('I store the text of the first address in the list', async function () {
  await this.deletePage.storeFirstAddressText();
});

When('I click the delete icon of the first address', async function () {
  await this.deletePage.clickDeleteIconOfFirstAddress();
  await eyes.check('Clicked delete icon', Target.window().ignoreRegions());
});

When('I choose to {string} the deletion', async function (confirmationAction) {
  await this.deletePage.chooseDeletionAction(confirmationAction);
  await eyes.check(`Chose to ${confirmationAction} the deletion`, Target.window().ignoreRegions());

});

Then('I should see the success message', async function () {
  await this.deletePage.verifySuccessMessage('see');
  await eyes.check('Success message visible', Target.window().ignoreRegions()); 
});

Then('I should not see the success message', async function () {
  await this.deletePage.verifySuccessMessage('not see');
  await eyes.check('Success message NOT visible', Target.window().ignoreRegions());
});

Then('I click OK to close the success message if visible', async function () {
  await this.deletePage.clickSuccessOkIfVisible();
});

Then('I should still see the address in the list', async function () {
  await this.deletePage.verifyAddressPresence(true);
  await eyes.check('Address still present in list', Target.window().ignoreRegions());
});

Then('I should not see the address in the list', async function () {
  await this.deletePage.verifyAddressPresence(false);
  await eyes.check('Address removed from list', Target.window().ignoreRegions());
});

Then('I should see an error message {string}', async function (errorText) {
  await this.deletePage.verifyErrorMessage(errorText);
  await eyes.check(`Error message: ${errorText}`, Target.window().ignoreRegions());
});
 