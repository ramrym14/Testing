const { usernameField, passwordField, loginButton } = require('../../ressources/Tunisia/loginSelectors');
const path = require('path');
const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    if (!page) throw new Error("❌ Page object is not initialized.");
    this.page = page;
  }

  async takeScreenshot(name) {
    const timestamp = Date.now();
    const filePath = path.join('images/login', `${name}-${timestamp}.png`);
    await this.page.screenshot({ path: filePath, fullPage: true });
    console.log(`📸 Screenshot saved: ${filePath}`);
  }

  async navigate() {
    console.log("🔁 Navigating to login page...");
    await this.page.context().clearCookies();
    await this.page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    console.log("🧹 Cleared cookies, localStorage, and sessionStorage.");

    await this.page.goto(process.env.BASE_URL, { waitUntil: 'domcontentloaded' });
    console.log(`🌐 Page loaded: ${process.env.BASE_URL}`);
  }

  async login(username, password) {
    console.log(`🔐 Attempting login with: ${username}`);

    console.log(`📝 Filling username field [${usernameField}]...`);
    await this.page.fill(usernameField, username);
    console.log("✅ Username filled.");

    console.log(`📝 Filling password field [${passwordField}]...`);
    await this.page.fill(passwordField, password);
    console.log("✅ Password filled.");

  try {
  console.log(`🚀 Clicking login button [${loginButton}]...`);
  await this.page.click(loginButton, { timeout: 5000 });
  console.log("📩 Login request sent.");
} catch (err) {
  console.error(`❌ Failed to click login button [${loginButton}]:`, err.message);
  this.loginClickFailed = true;
  
}
  }

  async checkCountryFlag(flagClass, shouldBeVisible = true) {
  // 🗺️ Dictionnaire de correspondance
 const flagToCountry = {
  'flag-icon-tn': 'Tunisia',
  'flag-icon-dz': 'Algeria',
  'flag-icon-ci': 'Côte d’Ivoire',
  'flag-icon-kw': 'Kuwait',
  'flag-icon-ae': 'United Arab Emirates',
  'flag-icon-bf': 'Burkina Faso',
  'flag-icon-ly': 'Libya',
  'flag-icon-sa': 'Saudi Arabia',
  'flag-icon-om': 'Oman',
};


  const countryName = flagToCountry[flagClass] || flagClass;

  const flagLocator = this.page.locator(`header .${flagClass}, .language-country-selector .${flagClass}`).first();

  if (shouldBeVisible) {
    console.log(`🔎 Checking visibility of country flag for: ${countryName}`);
    await expect(flagLocator).toBeVisible({ timeout: 3000 });
    console.log(`✅ Flag for ${countryName} is visible in the header`);
  } else {
    console.log(`❌ Flag for ${countryName} should NOT be visible`);
    await expect(flagLocator).toHaveCount(0);
    console.log(`🛑 No flag for ${countryName} found (as expected)`);
  }
}

}

module.exports = { LoginPage };
