const { Before, setDefaultTimeout } = require('@cucumber/cucumber');
const { startNewSession } = require('./testEnvironment');
const { LoginPage } = require('../pages/Tunisia/LoginPage');
const { addButton } = require('../ressources/Tunisia/DeliveryAddButtonSelectors');

setDefaultTimeout(60 * 1000);

// 🚀 Navigation vers Delivery Address sans screenshot
async function goToDeliverySectionCustom(page) {
  console.log('🧭 Navigating to Delivery Address section...');

  const swalOverlay = page.locator('.swal-overlay');
  if (await swalOverlay.isVisible()) {
    console.log('⚠️ Modale SweetAlert détectée, tentative de fermeture...');
    await page.keyboard.press('Escape');
    try {
      await swalOverlay.waitFor({ state: 'detached', timeout: 5000 });
      console.log('✅ Modale fermée');
    } catch {
      console.warn('❌ Modale toujours visible, suppression forcée');
      await page.evaluate(() => {
        const modal = document.querySelector('.swal-overlay');
        if (modal) modal.remove();
      });
    }
    await page.waitForTimeout(500);
  }

  await page.click('a.profile-button');
  await page.click('text=My account');
  await page.click('text=DELIVERY ADDRESS');

  console.log('⏳ Waiting for ADD button...');
  try {
    await page.waitForSelector(addButton, { state: 'visible', timeout: 5000 });
    console.log('✅ ADD button is visible');
  } catch (e) {
    console.warn('⚠️ ADD button not immediately visible, continuing...');
  }
}

// 🎯 Hook principal
Before(async function (scenario) {
  //  Extract tags from the scenario 
  const tags = scenario.pickle.tags.map(t => t.name);
  const isLogin = tags.includes('@login');

   // Start  Playwright session without logging in yet
  this.page = await startNewSession(false);

  if (isLogin) {
    console.log('⏭️ Skipping login for @login scenario');
    return;
  }

  const loginPage = new LoginPage(this.page);
  await loginPage.navigate();
  await loginPage.login("TN08343357", "megadios");
  await loginPage.waitForDashboard();
  console.log('✅ Login completed');

  // Navigate to Delivery Address section after login
  await goToDeliverySectionCustom(this.page);
});
