const path = require('path');
const {
  popupCloseButton,
  userIcon,
  myAccountLink,
  deliveryAddressTab,
  deliverySectionContainer,
  addressTable,
  tableRow,
  tableCell
} = require('../../ressources/Tunisia/DeliveryAddressListSelectors');

class DeliveryPage {
  constructor(page) {
    if (!page) throw new Error("Page object is not initialized.");
    this.page = page;
  }

  async takeScreenshot(name) {
   
    const filePath = path.join('images/Tunisia/DeliveryAddressList', `${name}.png`);
    await this.page.screenshot({ path: filePath, fullPage: true });
  }

  async closePopupIfVisible() {
    console.log("👉 Checking if popup is visible...");
    const popup = this.page.locator(popupCloseButton);
    if (await popup.isVisible()) {
      await popup.click();
      await this.takeScreenshot('01-popup-closed');
      console.log('✅ Popup closed');
    } else {
      console.log('ℹ️ No popup to close');
    }
  }

  async clickUserIcon() {
    console.log("👤 Clicking on user icon...");
    await this.page.click(userIcon);
    await this.takeScreenshot('02-user-icon-clicked');
    console.log('✅ User icon clicked');
  }

  async clickMyAccount() {
    console.log("📂 Clicking on My Account...");
    await this.page.click(myAccountLink);
    await this.takeScreenshot('03-my-account-clicked');
    console.log('✅ My Account clicked');
  }

  async clickDeliveryAddressTab() {
    console.log("📬 Clicking on Delivery Address tab...");
    await this.page.click(deliveryAddressTab);
    const section = this.page.locator(deliverySectionContainer);
    await section.waitFor({ state: 'visible' });
    await this.takeScreenshot('04-delivery-address-tab');
    console.log('✅ Delivery address section is visible');
  }

  async assertTableIsVisible() {
    console.log("🔍 Checking if address table is present...");
  
    const table = this.page.locator(addressTable);
    const rows = this.page.locator(tableRow);
  
    // Debug: How many tables are matched?
    const count = await table.count();
    console.log(`🧪 Matched ${count} delivery table(s)`);
  
    if (count === 0) {
      await this.takeScreenshot('05-no-table-found');
      throw new Error('❌ No delivery address table matched the selector');
    }
  
    // Scroll into view
    await table.first().scrollIntoViewIfNeeded();
    console.log('📜 Scrolled into view');
  
    // Check visibility before waiting
    const isVisible = await table.first().isVisible();
    console.log(`🧪 Is table visible to Playwright? → ${isVisible}`);
  
    // Wait for table visibility
    await table.first().waitFor({ state: 'visible', timeout: 10000 });
    console.log('✅ Table is now visible');
  
    // Wait for the first row to load
    await rows.first().waitFor({ state: 'visible', timeout: 10000 });
    console.log('✅ First row in address table is visible');
  
    await this.takeScreenshot('06-table-visible');
    console.log('📸 Screenshot of visible table captured');
  }
  
  async validateAllRowsHaveData() {
    console.log("📋 Validating rows inside the address table...");

     //  Locate all rows in the address table
    const rows = this.page.locator(tableRow);
    const count = await rows.count();
     //  If there are no rows, take a screenshot and fail the test
    if (count === 0) {
      await this.takeScreenshot('06-no-rows-found');
      throw new Error('❌ No delivery rows found');
    }

    console.log(`🔎 Found ${count} row(s). Validating each cell...`);

    for (let i = 0; i < count; i++) {
      //  For each row, check   5 columns 
      for (let j = 0; j < 5; j++) {
        const cell = this.page.locator(tableCell(i, j));
        const text = (await cell.textContent())?.trim();
       //  If the cell is empty or null, take a screenshot and throw an error
        if (!text) {
          await this.takeScreenshot(`07-empty-cell-row${i + 1}-col${j + 1}`);
          throw new Error(`❌ Empty cell at row ${i + 1}, column ${j + 1}`);
        }

        console.log(`✅ Row ${i + 1} Col ${j + 1} ➜ "${text}"`);
      }
    }
      //  All rows are valid — capture screenshot to confirm
    await this.takeScreenshot('08-all-rows-valid');
    console.log('✅ All delivery address rows contain valid data');
  }
}

module.exports = { DeliveryPage };
