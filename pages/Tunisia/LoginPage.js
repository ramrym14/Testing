const { usernameField, passwordField, loginButton } = require('../../ressources/Tunisia/loginSelectors');
const path = require('path');

class LoginPage {
  constructor(page) {
    if (!page) throw new Error("Page object is not initialized.");
    this.page = page;
  }

  async takeScreenshot(name) {
    const timestamp = Date.now();
    const filePath = path.join('images/login', `${name}.png`);
    await this.page.screenshot({ path: filePath, fullPage: true });
  }

  async navigate() {
    console.log("***** Navigating to login page *****");
    await this.page.context().clearCookies();
    await this.page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });

    console.log(`******* Going to: ${process.env.BASE_URL}   ********`);
    await this.page.goto(process.env.BASE_URL, { waitUntil: 'domcontentloaded' });
  }

  async login(username, password) {
    console.log(`*******Logging in with username: ${username}  *******`);
    await this.page.fill(usernameField, username);
    await this.page.fill(passwordField, password);

    console.log(" ****** Filled the  password fields.   *******");
    await this.takeScreenshot('03-filled-password');

   
    await this.page.evaluate(() => {
      const captcha = document.querySelector('input[name="captcha"]');
      if (captcha) {
        captcha.value = 'dummyCaptcha';
      }
    });

    await this.page.waitForTimeout(500);

    console.log(" ****** Clicking login button... ******");
    await this.page.click(loginButton);
    await this.takeScreenshot('04-after-click-login');
  }

  async waitForDashboard() {
    console.log("******* Waiting for dashboard to load ****** ");
    await this.page.waitForURL('**/dashboard');
    await this.takeScreenshot('05-dashboard');
    console.log(" **** Dashboard loaded successfully.  *****");
  }
}

module.exports = { LoginPage };
