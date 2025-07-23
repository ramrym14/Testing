const { chromium } = require('@playwright/test');
const path = require('path');

require('dotenv').config();

let browser = null;
let context = null;
let page = null;


async function startNewSession() {
  if (browser && context && page) {
    console.log('⚠️ Session already started. Returning existing session.');
    return page;
  }

  try {
    const browser = await chromium.launch({
  channel: 'chrome',
  headless: isCI,          // headless in CI
  slowMo: isCI ? 0 : 150,  // no delay in CI
});
   // browser = await chromium.launch({
    //  channel: 'chrome',
    // headless: false,        // Visible browser for debugging
   //   slowMo: 150,            // Delay for step visibility
   //});

    context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/123.0.0.0 Safari/537.36',
      viewport: { width: 1250, height: 700 },

      extraHTTPHeaders: {
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'accept-language': 'en-US,en;q=0.9',
        'referer': process.env.BASE_URL,
        'origin': process.env.BASE_URL,
      }
    });

    page = await context.newPage();

    // ✅ Navigate to base URL and verify page is alive
    await page.goto(process.env.BASE_URL, { waitUntil: 'load', timeout: 10000 });
    console.log('🧼 New browser session started and navigated to login page.');

    // 🧪 Optional: check if DOM is usable
    const bodyExists = await page.locator('body').isVisible({ timeout: 3000 }).catch(() => false);
    if (!bodyExists) {
      console.warn('⚠️ Page body not visible — possible loading failure.');
    }

    return page;

  } catch (error) {
    console.error('❌ Failed to start browser session:', error.message);

    // Ensure cleanup if failure occurs
    if (page) await page.close().catch(() => {});
    if (context) await context.close().catch(() => {});
    if (browser) await browser.close().catch(() => {});

    browser = null;
    context = null;
    page = null;

    throw new Error('Browser session could not be initialized.');
  }
}

// Cleanly close all Playwright resources.
// Pass `shouldClose = true` to close browser (false = keep open for debugging)
async function closeSession(shouldClose = true) {
  if (!shouldClose) {
    console.log('⚠️ Skipping browser close due to failure (for debugging or AI analysis)');
    return;
  }

  try {
    // Optional short delay to ensure logs or screenshots flush
    await new Promise(res => setTimeout(res, 500));

    if (page && !page.isClosed?.()) await page.close();
    if (context) await context.close();
    if (browser) await browser.close();

    console.log('🔴 Session closed');
  } catch (err) {
    console.error('❌ Error while closing session:', err.message);
  } finally {
    // Always reset references to avoid stale sessions
    page = null;
    context = null;
    browser = null;
  }
}



function getPage() {
  if (!page) throw new Error('Page not initialized — call startNewSession first.');
  return page;
}

module.exports = {
  startNewSession,
  closeSession,
  getPage
};
