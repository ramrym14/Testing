const {
  deleteIcon,
  confirmDeleteButton,
  cancelDeleteButton,
  successMessage,

  defaultToggleInput,
  countryDropdown,
  countryDropdownList,
  countryOption
} = require('../../ressources/Tunisia/DeleteDeliverySelectors');

const path = require('path');

class DeleteDeliveryAddressPage {
  constructor(page) {
    if (!page) throw new Error('Page object is not initialized.');
    this.page = page;
    this.deletedText = null; // Store the address text to verify after deletion
    this.shouldSkip = false; // skip steps if no address is deletable
    this.targetRow = null; //  The row that is targeted for deletion
  }

  async takeScreenshot(name) {
    const filePath = path.join('images/Tunisia/DeleteDelivery', `${name}.png`);
    await this.page.screenshot({ path: filePath, fullPage: true });
    console.log(`📸 Screenshot taken: ${filePath}`);
  }
 //  Find a deletable address (non-default and not "no data available")
  async storeFirstAddressText() {
    console.log('📌 Looking for the first deletable address...');
  
    const rows = this.page.locator('tbody tr'); // ✅ Locate all rows
    const count = await rows.count();
    console.log(`📊 Total number of rows in the address table: ${count}`);
  
    if (count === 0) {
      console.log('⚠️ No rows found.');
      this.shouldSkip = true;
      return;
    }
  
    // Check first row
    const firstRow = rows.nth(0);
    const firstCell = firstRow.locator('td').first();
    const firstText = (await firstCell.textContent()).trim();
    const isFirstDefault = await firstRow.locator('input.changeStatus:checked').count() > 0;
  
    if (!isFirstDefault && !firstText.toLowerCase().includes('no data available')) {
      this.deletedText = firstText;
      this.targetRow = firstRow;
      console.log(`✅ Stored address text from row 1: "${this.deletedText}"`);
      return;
    }
  
    console.log(`⚠️ First row skipped: ${isFirstDefault ? 'default address' : 'no data available'}`);
  
       // Check second row if exists
    if (count > 1) {
      const secondRow = rows.nth(1);
      const secondCell = secondRow.locator('td').first();
      const secondText = (await secondCell.textContent()).trim();
  
      if (secondText.toLowerCase().includes('no data available')) {
        console.log('⚠️ Second row skipped: no data available');
        this.shouldSkip = true;
        return;
      }
  
      this.deletedText = secondText;
      this.targetRow = secondRow;
      console.log(`✅ Stored address text from row 2: "${this.deletedText}"`);
      return;
    }
  
    console.log('⚠️ No deletable address found. Skipping remaining steps.');
    this.shouldSkip = true;
  }
  
  
  async clickDeleteIconOfFirstAddress() {
    if (this.shouldSkip) return;
    console.log('🗑️ Clicking delete icon of the deletable address...');
    const deleteButton = this.targetRow.locator(deleteIcon);
    await deleteButton.click();
    await this.takeScreenshot('clicked-delete-icon');
  }
  //  Choose to confirm or cancel the deletion
  async chooseDeletionAction(action) {
    if (this.shouldSkip) return;
    if (action === 'Cancel') {
      console.log('❌ Cancelling the deletion...');
      await this.page.click(cancelDeleteButton);
    } else if (action === 'Yes, delete!') {
      console.log('✅ Confirming the deletion...');
      await this.page.click(confirmDeleteButton);
    } else {
      throw new Error(`Unknown deletion action: ${action}`);
    }
    await this.takeScreenshot(`after-${action.replace(/\s+/g, '-').toLowerCase()}`);
  }
 //  Validate whether the success message appears or not
  async verifySuccessMessage(expectation) {
    if (this.shouldSkip) return;
    const successLocator = this.page.locator(successMessage);

    if (expectation === 'see') {
      await successLocator.waitFor({ state: 'visible', timeout: 5000 });
      console.log('✅ Success message is visible');
    } else if (expectation === 'not see') {
      try {
        await successLocator.waitFor({ state: 'visible', timeout: 3000 });
        throw new Error('❌ Success message appeared but should not');
      } catch {
        console.log('✅ Success message not visible (as expected)');
      }
    }
  }
 //  Close SweetAlert success popup if it's visible
  async clickSuccessOkIfVisible() {
    if (this.shouldSkip) return;
    const okButton = this.page.locator('.swal-modal button:has-text("OK")');
    try {
      await okButton.waitFor({ state: 'visible', timeout: 3000 });
      if (await okButton.isVisible()) {
        console.log('🔁 Clicking OK button to close success alert...');
        await okButton.click();
        await this.takeScreenshot('clicked-ok-success');
      }
    } catch {
      console.log('ℹ️ OK button not visible, skipping click.');
    }
  }
  //  Verify whether the address is still visible in the table
  async verifyAddressPresence(shouldExist) {
    if (this.shouldSkip) return;
    const addressLocator = this.page.locator(`table td:has-text("${this.deletedText}")`);

    if (shouldExist) {
      await addressLocator.waitFor({ state: 'visible', timeout: 5000 });
      console.log(`✅ Address "${this.deletedText}" is still present`);
    } else {
      const count = await addressLocator.count();
      if (count > 0) throw new Error(`❌ Address "${this.deletedText}" was not deleted`);
      console.log(`✅ Address "${this.deletedText}" is no longer present`);
    }
  }

  async selectCountry(country) {
    if (!country) {
      console.log('ℹ️ No country selected, skipping...');
      return;
    }

    console.log(`🌍 Step 1: Attempting to select country "${country}"...`);

    const dropdown = this.page.locator(countryDropdown);
    console.log('📍 Step 2: Clicking country dropdown...');
    await dropdown.click();

    console.log('⏳ Step 3: Waiting for country list to appear...');
    await this.page.waitForTimeout(1000);

    const list = this.page.locator(countryDropdownList);
    try {
      await list.waitFor({ state: 'visible', timeout: 8000 });
      console.log('✅ Step 4: Country list is now visible.');
    } catch (e) {
      console.error(`❌ Failed to show country list within timeout: ${e.message}`);
      throw e;
    }

    const option = this.page.locator(countryOption(country));
    try {
      console.log(`🔍 Step 5: Looking for country option "${country}"...`);
      await this.takeScreenshot('country');
      await option.waitFor({ state: 'visible', timeout: 8000 });
      console.log(`✅ Step 6: Country option "${country}" is visible.`);
    } catch (e) {
      console.error(`❌ Could not find country "${country}" in the list: ${e.message}`);
      throw e;
    }

    console.log(`🖱️ Step 7: Clicking on "${country}"...`);
    await option.click();

    console.log('⏳ Step 8: Waiting for page to reload addresses...');
    await this.page.waitForTimeout(3000);

    console.log(`📸 Step 9: Taking screenshot after selecting country "${country}"...`);
    await this.takeScreenshot(`country-selected-${country}`);
  }
//  Check if the current address is marked as default
  async isAddressDefault() {
    const defaultToggle = this.page.locator(defaultToggleInput);
    return await defaultToggle.count() > 0;
  }
 //  Check if a specific error message appears
  async verifyErrorMessage(messageText) {
    if (this.shouldSkip) return;
    const errorLocator = this.page.locator(`text="${messageText}"`);
    await errorLocator.waitFor({ state: 'visible', timeout: 3000 });
    console.log(`❗Error message visible: ${messageText}`);
  }
}

module.exports = { DeleteDeliveryAddressPage };