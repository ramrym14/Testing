const path = require('path');
const { 
  addButton, countryDropdown, countryDropdownList, countryOption,
  modalForm, governorateDropdown, governorateOptionList, 
  cityDropdown, cityOptionList, localityDropdown, localityOptionList,
  addressInput, phoneInput, registerButton 
} = require('../../ressources/Tunisia/DeliveryAddButtonSelectors');

class DeliveryAddButtonPage {
  constructor(page) {
    if (!page) throw new Error("Page object is not initialized.");
    this.page = page;
  }

  async takeScreenshot(name) {
    const filePath = path.join('images/Tunisia/CountrySelection', `${name}.png`);
    await this.page.screenshot({ path: filePath, fullPage: true });
    console.log(`📸 Screenshot taken: ${filePath}`);
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
    await this.page.waitForTimeout(3000); // waiting for potential loader
    await this.takeScreenshot(`country-selected-${country}`);
  }
   //  Check if the ADD button is visible
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
    console.log(`🔍 ADD button class: ${classAttribute}`);
    
    // Disable button if class includes indicators like "disabled", "grey", or "inactive"
    const isDisabledByClass = classAttribute.includes('disabled') || classAttribute.includes('grey') || classAttribute.includes('inactive');
    const isEnabled = !isDisabledByClass;
    await this.takeScreenshot(`add-button-enabled-${isEnabled}`);
    return isEnabled;
  }
 //  Click the ADD button if it is enabled
  async clickAddButton() {
    console.log('🖱️ Clicking ADD button...');
    const locator = this.page.locator(addButton);
    const isEnabled = await this.isAddButtonEnabled();

    if (!isEnabled) {
      console.log('❌ ADD button is disabled, skipping click.');
      await this.takeScreenshot('add-button-disabled-cannot-click');
      return;
    }

    await locator.click();
    console.log('✅ Clicked on ADD button');
    await this.takeScreenshot('clicked-add-button');
  }

    //  Check if the modal form is open

  async isModalOpen() {
    const isOpen = await this.page.isVisible(modalForm);
    console.log(`🔍 Modal opened? ${isOpen}`);
    await this.takeScreenshot(`modal-opened-${isOpen}`);
    return isOpen;
  }

  async fillDeliveryForm() {
    console.log('📝 Filling delivery form...');
  
    // 1. Select Governorate
    await this.page.click(governorateDropdown);
    await this.page.waitForSelector(governorateOptionList, { state: 'visible', timeout: 5000 });
    await this.page.click(`${governorateOptionList} >> nth=0`);//first gov
    console.log('✅ Selected governorate');
    await this.page.waitForTimeout(2000); // ⏳ wait for city list to update
  
    // 2. Select City (after Governorate updates it)
    await this.page.click(cityDropdown);
    await this.page.waitForSelector(cityOptionList, { state: 'visible', timeout: 5000 });
    await this.page.click(`${cityOptionList} >> nth=0`); //first city
    console.log('✅ Selected city');
    await this.page.waitForTimeout(2000); // ⏳ wait for locality list to update
  
    // 3. Select Locality (after City updates it)
    await this.page.click(localityDropdown);
    await this.page.waitForSelector(localityOptionList, { state: 'visible', timeout: 5000 });
    await this.page.click(`${localityOptionList} >> nth=0`);
    console.log('✅ Selected locality');
  
    // 4. Fill Phone
    await this.page.fill(phoneInput, '20123456');
    console.log('✅ Filled phone number');
  
    // 5. Fill Address
    await this.page.fill(addressInput, 'Test Street 123');
    console.log('✅ Filled address');
  
    await this.takeScreenshot('form-filled');
  }
  

  async submitDeliveryForm() {
    console.log('🚀 Submitting delivery form...');
    await this.page.click(registerButton);
    await this.takeScreenshot('clicked-register');
    await this.page.waitForTimeout(3000);
    console.log('✅ Form submitted');
  }
  async fillInvalidDeliveryForm() {
    console.log('📝 Filling delivery form with invalid data...');
    
    // Correctly select governorate, city, locality first
    await this.page.click(governorateDropdown);
    await this.page.waitForSelector(governorateOptionList, { state: 'visible', timeout: 5000 });
    await this.page.click(`${governorateOptionList} >> nth=0`);
    console.log('✅ Selected governorate');
    await this.page.waitForTimeout(2000);
  
    await this.page.click(cityDropdown);
    await this.page.waitForSelector(cityOptionList, { state: 'visible', timeout: 5000 });
    await this.page.click(`${cityOptionList} >> nth=0`);
    console.log('✅ Selected city');
    await this.page.waitForTimeout(2000);
  
    await this.page.click(localityDropdown);
    await this.page.waitForSelector(localityOptionList, { state: 'visible', timeout: 5000 });
    await this.page.click(`${localityOptionList} >> nth=0`);
    console.log('✅ Selected locality');
  
    // Fill phone incorrectly (too short)
    await this.page.fill(phoneInput, '22');
    console.log('✅ Filled invalid phone number');
  
    // Leave address empty
    await this.page.fill(addressInput, '');
    console.log('✅ Left address field empty');
  
    await this.takeScreenshot('form-filled-invalid');
  }
  
}

module.exports = { DeliveryAddButtonPage };
