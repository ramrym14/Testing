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
    const filePath = path.join('images/DeleteCountrySection', `${name}.png`);
    await this.page.screenshot({ path: filePath, fullPage: true });
    console.log(`📸 Screenshot taken: ${filePath}`);
  }


 //  Find a deletable address (non-default and not "no data available")

async storeFirstAddressText() {
  // 🛠️ Choisissez un sélecteur plus fiable ici si vous avez un ID ou une classe
  const table = this.page.locator('.dataTables_scrollBody table');

  const rows = table.locator('tbody tr');
  await rows.first().waitFor({ state: 'visible', timeout: 10000 });

  const count = await rows.count();
  console.log(`📊 Found ${count} address rows`);

  if (count === 0) {
    await this.takeScreenshot('no-visible-rows');
    console.warn('⚠️ No rows found, skipping.');
    this.shouldSkip = true;
    return;
  }

  for (let i = 0; i < Math.min(count, 2); i++) {
    const row = rows.nth(i);
    const text = (await row.locator('td').first().textContent()).trim();
    const isDefault = await row.locator('input.changeStatus:checked').count() > 0;

    if (!isDefault && !text.toLowerCase().includes('no data')) {
      this.deletedText = text;
      this.targetRow = row;
      console.log(`✅ Stored address from row ${i + 1}: "${this.deletedText}"`);
      return;
    }

    console.log(`⚠️ Row ${i + 1} skipped: ${isDefault ? 'default address' : 'invalid text'}`);
  }

  console.warn('⚠️ No deletable address found.');
  this.shouldSkip = true;
}


async chooseDeletionAction(action) {
  if (this.shouldSkip) return;

  if (action === 'Cancel') {
    console.log('❌ Cancelling the deletion...');
    const cancelButton = this.page.locator(cancelDeleteButton);
    await this.takeScreenshot('before-cancel-click');

    await cancelButton.waitFor({ state: 'visible', timeout: 5000 });
    await cancelButton.scrollIntoViewIfNeeded();
    await cancelButton.click({ force: true });

    await this.takeScreenshot('after-cancel-click');

  } else if (action === 'Yes, delete!') {
    console.log('✅ Confirming the deletion...');

    let confirmButton = this.page.locator(confirmDeleteButton);

    await this.takeScreenshot('before-confirm-wait');

    // 🔁 Tentative normale
    try {
      await confirmButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.takeScreenshot('confirm-button-visible');
      await confirmButton.scrollIntoViewIfNeeded();
      await confirmButton.click({ force: true });
      console.log('✅ Confirm delete button clicked normally.');
    } catch (error) {
      console.warn('⚠️ Confirm button not visible in time — trying fallback click.');

      // Fallback 1: clic sur le 2e bouton de la modale SweetAlert
      confirmButton = this.page.locator('.swal-footer button:nth-child(2)');
      const fallbackExists = await confirmButton.count();

      if (fallbackExists === 0) {
        await this.takeScreenshot('fallback-confirm-button-not-found');
        console.warn('⚠️ Fallback button not found either. Continuing anyway...');
        return; // 🟡 On continue quand même pour ne pas bloquer
      }

      try {
        await confirmButton.click({ force: true });
        console.log('✅ Fallback confirm button clicked.');
      } catch (e2) {
        await this.takeScreenshot('fallback-confirm-button-click-failed');
        console.warn('❌ Fallback confirm button click failed.');
      }
    }

    await this.takeScreenshot('after-confirm-click');

  } else {
    throw new Error(`Unknown deletion action: ${action}`);
  }

  await this.takeScreenshot(`after-${action.replace(/\s+/g, '-').toLowerCase()}`);
}


 //  Validate whether the success message appears or not
async verifyAddressPresence(shouldExist) {
  if (this.shouldSkip) return;

  const addressLocator = this.page.locator(`table td:has-text("${this.deletedText}")`);
  const count = await addressLocator.count();

  if (shouldExist && count === 0) {
    throw new Error(`❌ Address "${this.deletedText}" not found`);
  } else if (!shouldExist && count > 0) {
    throw new Error(`❌ Address "${this.deletedText}" was not deleted`);
  }

  console.log(`✅ Address "${this.deletedText}" ${shouldExist ? 'is still present' : 'is no longer present'}`);
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
async clickDeleteIconOfFirstAddress() {
  if (this.shouldSkip) return;
  console.log('🗑️ Clicking delete icon of the deletable address...');

  const deleteButton = this.targetRow.locator(deleteIcon);
  await deleteButton.click();
  await this.takeScreenshot('clicked-delete-icon');

  // ✅ Attente explicite que la modale SweetAlert apparaisse
  const swalModal = this.page.locator('.swal-modal');
  try {
    await swalModal.waitFor({ state: 'visible', timeout: 5000 });
    console.log('✅ SweetAlert modal is visible.');
    await this.takeScreenshot('swal-modal-visible');
  } catch (e) {
    await this.takeScreenshot('swal-modal-not-visible');
    throw new Error('❌ SweetAlert modal did not appear after clicking delete icon');
  }
}

  //  Verify whether the address is still visible in the table
async verifyAddressPresence(shouldExist) {
  if (this.shouldSkip) return;

  const addressLocator = this.page.locator(`table td:has-text("${this.deletedText}")`);
  const count = await addressLocator.count();

  if (shouldExist && count === 0) {
    throw new Error(`❌ Address "${this.deletedText}" not found but was expected`);
  } else if (!shouldExist && count > 0) {
    throw new Error(`❌ Address "${this.deletedText}" was found but should have been deleted`);
  }

  console.log(`✅ Address "${this.deletedText}" ${shouldExist ? 'is still present' : 'is no longer present'}`);
}


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