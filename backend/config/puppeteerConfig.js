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
    
    await page.evaluate(async () => {
      // Wait for all images to load
      const imagePromises = Array.from(document.images).map(img => {
        if (img.complete) return;
        return new Promise(resolve => {
          img.addEventListener('load', resolve);
          img.addEventListener('error', resolve);
        });
      });
    
      // Wait for all animations to complete
      const animationPromises = Array.from(document.querySelectorAll('*')).map(element => {
        const computedStyle = window.getComputedStyle(element);
        const animationDuration = parseFloat(computedStyle.animationDuration) || 0;
        const animationDelay = parseFloat(computedStyle.animationDelay) || 0;
        const totalAnimationTime = (animationDuration + animationDelay) * 1000;
    
        if (totalAnimationTime > 0) {
          return new Promise(resolve => setTimeout(resolve, totalAnimationTime));
        }
      });
    
      await Promise.all([...imagePromises, ...animationPromises]);
    });


    const screenshotBuffer = await page.screenshot({ fullPage: true }); // or fullPage: false
    return screenshotBuffer;
  } catch (error) {
    console.error('Error capturing screenshot with Puppeteer:', error);
    throw new Error('Failed to capture screenshot');
  } finally {
    if (browser) await browser.close();
  }
};
