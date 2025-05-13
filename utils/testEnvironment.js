const { chromium } = require('@playwright/test');
const path = require('path');
const { LoginPage } = require('../pages/Tunisia/LoginPage');
require('dotenv').config();

let browser, context, page;

async function startNewSession(doLogin = true) {
  //  Si une session existe déjà, la réutiliser
  if (page) {
    console.log('♻️ Réutilisation de la session existante');
    return page;
  }
//  Launch Chromium browser in headless mode using real Chrome channel
  browser = await chromium.launch({
    channel: 'chrome',
    headless: true,
    args: ['--headless=new']
  });

  //  Create a new browser context with realistic settings
  context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/123.0.0.0 Safari/537.36',
    viewport: { width: 1280, height: 800 },
    extraHTTPHeaders: {
      'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'accept-language': 'en-US,en;q=0.9',
      'referer': process.env.BASE_URL,
      'origin': process.env.BASE_URL,
      'sec-fetch-site': 'same-origin',
      'sec-fetch-mode': 'navigate',
      'sec-fetch-user': '?1',
      'sec-fetch-dest': 'document',
      'upgrade-insecure-requests': '1'
    }
  });

// 🗂️ Open a new tab (page) and go to the BASE_URL defined in .env
  page = await context.newPage();
  await page.goto(process.env.BASE_URL);
  console.log('🧼 Session started using Google Chrome');

  // 🔐 Perform login if required
  if (doLogin) {
    const loginPage = new LoginPage(page);
    await loginPage.login("TN08343357", "megadios");
    console.log('✅ Auto-login performed');
  }

  return page;
}

// Cleanly close all Playwright resources.
async function closeSession() {
  if (page) await page.close();  // Close the tab
  if (context) await context.close();
  if (browser) await browser.close();

   // Reset references to null to allow future reinitialization
  page = null;
  context = null;
  browser = null;

  console.log('🔴 Session closed');
}
// Return the currently active Playwright page.
// Throws an error if no session is started.
function getPage() {
  if (!page) throw new Error('Page not initialized — call startNewSession first.');
  return page;
}

module.exports = {
  startNewSession,
  closeSession,
  getPage
};
