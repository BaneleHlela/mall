import puppeteer from 'puppeteer';

export const captureScreenshot = async (url, width = 1280, height = 800) => {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();

    // Set the viewport size
    await page.setViewport({
      width,
      height,
      deviceScaleFactor: 1,
    });

    await page.goto(url, { waitUntil: 'networkidle2', timeout: 0 });

    const screenshotBuffer = await page.screenshot({ fullPage: true }); // or fullPage: false
    return screenshotBuffer;
  } catch (error) {
    console.error('Error capturing screenshot with Puppeteer:', error);
    throw new Error('Failed to capture screenshot');
  } finally {
    if (browser) await browser.close();
  }
};
