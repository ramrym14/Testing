const { Given } = require('@cucumber/cucumber');
const { LoginPage } = require('../../pages/Tunisia/LoginPage');
const { DeliveryAddButtonPage } = require('../../pages/Countries/AddDeliveryAddressPage');
const { Target } = require('../../utils/eyesHelper');

Given('I am logged in as {string} from {string}', async function (username, country) {
  this.username = username;
  this.country = country;
  const loginPage = new LoginPage(this.page);
  await loginPage.navigate();
  await loginPage.login(username, 'megadios');
});

Given('I am on the delivery address section', async function () {
  this.deliveryAddPage = new DeliveryAddButtonPage(this.page, this.country);
  await this.deliveryAddPage.goToDeliveryAddressSection();
  const { eyes } = this;
  if (eyes) await eyes.check('Delivery Address Section', Target.window().ignoreRegions());
});
