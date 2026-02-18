import { chromium } from "playwright";
(async () => {

  const browser = await chromium.launch({
    headless: false, // IMPORTANT: headful works better
  });

  const context = await browser.newContext({
    locale: 'en-ZA',
    timezoneId: 'Africa/Johannesburg',
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
      '(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    viewport: { width: 1366, height: 768 }
  });

  const page = await context.newPage();

  await page.goto('https://www.gucci.com/za/en_gb/', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  // wait for bot checks to finish
  await page.waitForTimeout(7000);

  await page.screenshot({
    path: 'gucci.png',
    fullPage: true
  });

  await browser.close();

})();
