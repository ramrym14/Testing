const path = require('path');
const countryForms = require('../../ressources/countryAddressForms');
const {
  addButton,
  countryDropdown,
  countryDropdownList,
  countryOption,
  modalForm,
 registerButton
} = require('../../ressources/Tunisia/DeliveryAddButtonSelectors');
const { DeliveryPage } = require('../../pages/Tunisia/DeliveryPage');
class DeliveryAddButtonPage {
  constructor(page, country) {
    if (!page) throw new Error("Page object is not initialized.");
    this.page = page;
    this.country = country;
    this.formConfig = countryForms[country];
    this.deliveryPage = new DeliveryPage(page);
  }

  async takeScreenshot(name) {
    const filePath = path.join('images/ADDCountrySelection', `${name}.png`);
    await this.page.screenshot({ path: filePath, fullPage: true });
    console.log(`📸 Screenshot taken: ${filePath}`);
  }




async goToDeliveryAddressSection() {
  console.log('🔁 Going to Delivery Address Section via UI...');

  await this.deliveryPage.takeScreenshot('before-popup-check');

  // ✅ Attempt to close modal if visible
  await this.deliveryPage.closePopupIfVisible();

  // ✅ Ensure modal is detached before clicking
  await this.page.waitForSelector('.swal-overlay', { state: 'detached', timeout: 5000 }).catch(() => {
    console.warn('⚠️ Modal not detached after timeout');
  });

  // ✅ Capture screenshot before user icon click
  await this.deliveryPage.takeScreenshot('before-click-user-icon');
  await this.deliveryPage.clickUserIcon();

  // ✅ Wait and debug what "My Account" looks like
  await this.deliveryPage.takeScreenshot('before-click-my-account');

  // Update selector based on actual DOM
  await this.page.click('a[href*="advisors/edit"]', { timeout: 7000 }); // fallback
  console.log('✅ Fallback My Account link clicked');

  await this.deliveryPage.takeScreenshot('after-click-my-account');

  // Click on Delivery Address
  await this.deliveryPage.clickDeliveryAddressTab();
  await this.deliveryPage.takeScreenshot('after-click-delivery-address');
}


  async selectCountry(country) {
    if (!country) {
      console.log('ℹ️ No country selected, skipping...');
      return;
    }
    console.log(`🌍 Selecting country: ${country}`);
    await this.page.click(countryDropdown);
    await this.page.waitForSelector(countryDropdownList);
    await this.page.click(countryOption(country));
    await this.page.waitForTimeout(3000);
    await this.takeScreenshot(`country-selected-${country}`);
  }

  async isAddButtonVisible() {
    const locator = this.page.locator(addButton);
    const isVisible = await locator.isVisible();
    console.log(`🔍 ADD button visible? ${isVisible}`);
    await this.takeScreenshot(`add-button-visible-${isVisible}`);
    return isVisible;
  }

  async isAddButtonEnabled() {
    const locator = this.page.locator(addButton);
    const classAttribute = await locator.getAttribute('class');
    const isDisabled = classAttribute?.includes('disabled') || classAttribute?.includes('grey') || classAttribute?.includes('inactive');
    const isEnabled = !isDisabled;
    console.log(`🔍 ADD button enabled? ${isEnabled}`);
    await this.takeScreenshot(`add-button-enabled-${isEnabled}`);
    return isEnabled;
  }

  async clickAddButton() {
    const locator = this.page.locator(addButton);
    const isEnabled = await this.isAddButtonEnabled();
    if (!isEnabled) {
      console.log('❌ ADD button is disabled.');
      await this.takeScreenshot('add-button-disabled');
      return;
    }
    await locator.click();
    console.log('✅ ADD button clicked');
    await this.takeScreenshot('add-button-clicked');
  }

  async isModalOpen() {
    const isOpen = await this.page.isVisible(modalForm);
    console.log(`🔍 Modal open? ${isOpen}`);
    await this.takeScreenshot(`modal-open-${isOpen}`);
    return isOpen;
  }

async fillForm(formType = 'validData') {
  console.log(`📝 Filling form with ${formType} data`);

  const data = this.formConfig[formType];
  const selectors = this.formConfig.selectors;

  if (!data || !selectors) {
    console.error(`❌ Invalid form configuration for type "${formType}"`);
    await this.takeScreenshot(`invalid-form-config-${formType}`);
    throw new Error(`Missing form configuration for type "${formType}"`);
  }

  // 🔁 Sélection dynamique pour tous les "XXXIndex"
  for (const field in data) {
    if (field.endsWith('Index')) {
      const baseField = field.replace('Index', '');
      const index = data[field];

      const openSelector = selectors[baseField];
      const listSelector = selectors[`${baseField}Options`];

      if (typeof index === 'number' && openSelector && listSelector) {
        console.log(`🔽 Selecting ${baseField} at index ${index}`);
        try {
          await this.page.click(openSelector);
          await this.page.waitForSelector(`${listSelector} li`, { timeout: 5000 });

          const options = this.page.locator(`${listSelector} li`);
          const optionCount = await options.count();

          if (optionCount === 0) {
            console.warn(`⚠️ No options available for ${baseField} after opening dropdown.`);
            await this.takeScreenshot(`no-options-${baseField}`);
            continue;
          }

          if (index >= optionCount) {
            console.warn(`⚠️ Index ${index} out of range for ${baseField} (max ${optionCount - 1})`);
            await this.takeScreenshot(`index-out-of-range-${baseField}`);
            continue;
          }

          await options.nth(index).click();
          await this.page.waitForTimeout(7000); // ⏳ laisser du temps à la dépendance suivante
        } catch (err) {
          console.warn(`⚠️ Failed to select ${baseField}: ${err.message}`);
          await this.takeScreenshot(`select-error-${baseField}`);
        }
      }
    }
  }

  // ✍️ Remplissage des champs classiques (text fields)
  for (const field in selectors) {
    if (field.endsWith('Options') || data[`${field}Index`] !== undefined) continue;

    const selector = selectors[field];
    const value = data[field];

    if (selector && typeof value === 'string') {
      try {
        await this.page.fill(selector, value);
        console.log(`✅ Filled ${field} with '${value}'`);
      } catch (err) {
        console.warn(`⚠️ Failed to fill ${field}: ${err.message}`);
      }
    }
  }

  await this.takeScreenshot(`form-filled-${formType}`);
}


 async submitForm() {
  console.log('🚀 Submitting form');

  const registerSelector = this.formConfig.selectors?.registerButton;
  if (!registerSelector) {
    throw new Error(`❌ Missing registerButton selector for country ${this.country}`);
  }

  const registerBtn = this.page.locator(registerSelector);
  await registerBtn.waitFor({ state: 'visible', timeout: 5000 });

  const isDisabled = await registerBtn.getAttribute('disabled');
  const classAttr = await registerBtn.getAttribute('class');
  console.log(`🔍 Register button class: ${classAttr}`);

  if (isDisabled !== null || classAttr?.includes('disabled')) {
    throw new Error('❌ Register button is still disabled. Form may be incomplete.');
  }

  await registerBtn.scrollIntoViewIfNeeded();

  // ✅ Utilisation correcte du sélecteur CSS pur dans page.evaluate
  await this.page.evaluate((selector) => {
    const btn = document.querySelector(selector);
    if (btn) {
      console.log('🧪 Triggering native DOM click');
      btn.click();
    } else {
      console.warn(`⚠️ No element found for selector: ${selector}`);
    }
  }, registerSelector);

  console.log(`✅ REGISTER button clicked via native JS using selector: ${registerSelector}`);
  await this.page.waitForTimeout(3000);
}



}

module.exports = { DeliveryAddButtonPage };
