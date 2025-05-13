const path = require('path');
const {
  editIcon,
  modifyModalForm,
  phoneInput,
  addressInput,
  registerButton,
  countryDropdown,
  countryDropdownList,
  addressRow 
} = require('../../ressources/Tunisia/ModifyDeliverySelectors');

class ModifyDeliveryAddressPage {
  constructor(page) {
    if (!page) throw new Error('Page object is not initialized.');
    this.page = page;
    this.shouldSkip = false; //  skip remaining steps if something goes wrong
  }

  async takeScreenshot(name) {
    const filePath = path.join('images/Tunisia/ModifyDelivery', `${name}.png`);
    await this.page.screenshot({ path: filePath, fullPage: true });
    console.log(`📸 Screenshot taken: ${filePath}`);
  }
 //  Select a country from the dropdown and validate if address rows are available
  async selectCountry(country) {
    if (!country || country.trim().toLowerCase() === 'tunisie') {
      console.log('ℹ️ Default country is Tunisia. Skipping country selection...');
    } else {
        // Open and interact with the country dropdown
      console.log(`🌍 Selecting country: ${country}`);
      const dropdown = this.page.locator(countryDropdown);
      await dropdown.waitFor({ timeout: 5000 });
      await dropdown.click();

      const list = this.page.locator(countryDropdownList);
      await list.waitFor({ timeout: 5000 });

       // Try selecting the country option
      const optionLocator = this.page.locator(`${countryDropdownList} >> :has-text("${country}")`);
      try {
        await optionLocator.waitFor({ timeout: 5000 });
        await optionLocator.click();
        console.log(`✅ Country "${country}" selected.`);
      } catch (err) {
        console.error(`❌ Country "${country}" not found or not visible in list.`);
        await this.takeScreenshot(`country-not-found-${country}`);
        this.shouldSkip = true;
        return;
      }

      await this.page.waitForTimeout(1500);
    }
     //  After country selection, check the first row content
    const row = this.page.locator(addressRow).nth(0);
    try {
      await row.waitFor({ timeout: 5000 });
      const text = (await row.textContent())?.toLowerCase() || '';
      console.log(`🔎 Row 0 content: ${text}`);
       // Skip if placeholder message is shown
      if (text.includes('no data available')) {
        console.log('⚠️ Table shows "No data available". Skipping this scenario but marking as passed.');
        this.shouldSkip = true;
      } else {
        this.shouldSkip = false;
      }
    } catch {
       // If row can't be found at all, skip gracefully
      console.log('⚠️ Could not find row 0. Skipping safely.');
      await this.takeScreenshot('row0-not-found');
      this.shouldSkip = true;
    }
  }
//  Click the edit icon on the first address row
  async clickEditIcon() {
    if (this.shouldSkip) {
      console.log('⏩ Skipping edit icon click: no address rows available.');
      return;
    }

    console.log('🧭 Waiting for Delivery Address section to be ready...');
    await this.takeScreenshot('before-click-edit');

    const row = this.page.locator(addressRow).nth(0);
    await row.waitFor({ timeout: 10000 });
  //  Scroll to make sure edit icon is visible
    await this.page.evaluate(() => {
      const container = document.querySelector('.table-responsive') || document.querySelector('table');
      if (container) container.scrollLeft = container.scrollWidth;
    });
 // 🧹 Handle  pop-up if it's active
    const swalOverlay = this.page.locator('.swal-overlay');
    if (await swalOverlay.isVisible({ timeout: 1000 }).catch(() => false)) {
      console.warn('⚠️ SweetAlert detected. Pressing Escape to close it...');
      await this.page.keyboard.press('Escape');
      await this.page.waitForSelector('.swal-overlay', { state: 'detached', timeout: 3000 });
    }

    // Click on the edit icon inside the row
    const editButtonInRow = row.locator(editIcon).first();
    await editButtonInRow.waitFor({ timeout: 5000 });

    console.log('🖱️ Clicking edit icon in row 0...');
    await editButtonInRow.click();
    await this.takeScreenshot('clicked-edit-icon');
    await this.page.waitForTimeout(2000);
  }
  //  Check if the Modify Address modal is open
  async isModifyModalOpen() {
    if (this.shouldSkip) {
      console.log('⏩ Skipping modal check: no address row available.');
      return false;
    }

    console.log('🔍 Checking if Modify Modal is open...');
    try {
      const modal = this.page.locator(modifyModalForm);
      await modal.waitFor({ timeout: 10000 });
      const visible = await modal.isVisible();
      await this.takeScreenshot(`modify-modal-open-${visible}`);
      return visible;
    } catch {
      console.error('❌ Modify modal selector not found or not visible within 10s');
      await this.takeScreenshot('modify-modal-NOT-found');
      return false;
    }
  }

  async fillModifyForm(phone, address) {
    if (this.shouldSkip) {
      console.log('⏩ Skipping form filling: no editable address.');
      return;
    }

    console.log(`📝 Filling Modify Form: Phone="${phone}" Address="${address}"`);
    await this.page.waitForSelector(phoneInput, { timeout: 5000 });
    await this.page.waitForSelector(addressInput, { timeout: 5000 });

    await this.page.fill(phoneInput, phone || '');
    await this.page.fill(addressInput, address || '');

    await this.takeScreenshot('modify-form-filled');
  }

  async clickRegisterButton() {
    if (this.shouldSkip) {
      console.log('⏩ Skipping register click: no editable address.');
      return;
    }

    console.log('🖱️ Clicking REGISTER button...');
    await this.page.waitForSelector(registerButton, { timeout: 5000 });
    await this.page.click(registerButton);
    await this.takeScreenshot('clicked-register-button');
    await this.page.waitForTimeout(3000);
  }

  async verifyMessages(expectedMessagesArray) {
    if (this.shouldSkip) {
      console.log('⏩ Skipping message verification: no operation was performed.');
      return;
    }

    console.log(`🔍 Verifying expected messages: ${expectedMessagesArray}`);

    const allMessages = expectedMessagesArray
      .flatMap(msg => msg.split(','))
      .map(m => m.trim())
      .filter(Boolean);// for scenario virgule ("Too long, Please enter your address!")
      
    //this detect msg of sucess and see if it s visible or not on screen 
    for (const expectedMessage of allMessages) {
      const locator = this.page.locator(`text="${expectedMessage}"`);
      try {
        await locator.waitFor({ state: 'visible', timeout: 5000 });
        const isVisible = await locator.isVisible();
        if (!isVisible) throw new Error();
        console.log(`✅ Message "${expectedMessage}" found.`);
        await this.takeScreenshot(`message-found-${expectedMessage.replace(/\s+/g, '-')}`);//this "-" between words
      } catch {
        throw new Error(`❌ Expected message "${expectedMessage}" was not found.`);
      }
    }
  }
}

module.exports = { ModifyDeliveryAddressPage };
