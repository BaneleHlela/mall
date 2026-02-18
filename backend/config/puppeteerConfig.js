// import { chromium } from 'playwright';

// export const captureScreenshot = async (url, width = 1280, height = 800) => {
//   let browser;

//   try {
//     browser = await chromium.launch({
//       headless: true
//     });

//     const context = await browser.newContext({
//       viewport: {
//         width,
//         height
//       },
//       deviceScaleFactor: 1,
//       locale: 'en-ZA',
//       timezoneId: 'Africa/Johannesburg'
//     });

//     const page = await context.newPage();

//     await page.goto(url, {
//       waitUntil: 'domcontentloaded',
//       timeout: 0
//     });

//     // Wait for network to calm down (Playwright replacement for networkidle2)
//     await page.waitForLoadState('networkidle');

//     // ----- WAIT FOR PAGE TO FULLY STABILIZE -----
//     await page.evaluate(async () => {

//       // -------------------------
//       // WAIT FOR IMAGES TO LOAD
//       // -------------------------
//       const imagePromises = Array.from(document.images).map((img) => {
//         if (img.complete) return;
//         return new Promise((resolve) => {
//           img.addEventListener("load", resolve);
//           img.addEventListener("error", resolve);
//         });
//       });

//       // -------------------------
//       // WAIT FOR ANIMATIONS
//       // -------------------------
//       const animationPromises = Array.from(
//         document.querySelectorAll("*")
//       ).map((element) => {
//         const style = window.getComputedStyle(element);
//         const dur = parseFloat(style.animationDuration) || 0;
//         const delay = parseFloat(style.animationDelay) || 0;
//         const total = (dur + delay) * 1000;

//         if (total > 0) {
//           return new Promise((resolve) => setTimeout(resolve, total));
//         }
//       });

//       // -------------------------
//       // WAIT FOR SCROLLING TO FINISH
//       // -------------------------
//       const waitForScrollEnd = new Promise((resolve) => {
//         let timer;
//         let lastY = window.scrollY;

//         const onScroll = () => {
//           clearTimeout(timer);
//           timer = setTimeout(() => {
//             if (window.scrollY === lastY) {
//               window.removeEventListener("scroll", onScroll);
//               resolve(true);
//             } else {
//               lastY = window.scrollY;
//             }
//           }, 350);
//         };

//         window.addEventListener("scroll", onScroll);
//         onScroll();
//       });

//       // -------------------------
//       // FINAL WAIT
//       // -------------------------
//       await Promise.all([
//         ...imagePromises,
//         ...animationPromises,
//         waitForScrollEnd,
//       ]);
//     });

//     // ----- TAKE STABLE SCREENSHOT -----
//     const screenshotBuffer = await page.screenshot({ fullPage: true });

//     await context.close();
//     return screenshotBuffer;

//   } catch (error) {
//     console.error('Error capturing screenshot with Playwright:', error);
//     throw new Error('Failed to capture screenshot');

//   } finally {
//     if (browser) await browser.close();
//   }
// };


import puppeteer from 'puppeteer';


export const captureScreenshot = async (url, width = 1280, height = 800) => {
  let browser;
  try {
    browser = await puppeteer.launch({});

    const page = await browser.newPage();

    await page.setViewport({
      width,
      height,
      deviceScaleFactor: 1,
    });

    await page.goto(url, { waitUntil: 'networkidle2', timeout: 0 });

    // ----- WAIT FOR PAGE TO FULLY STABILIZE -----
    await page.evaluate(async () => {

      // -------------------------
      // WAIT FOR IMAGES TO LOAD
      // -------------------------
      const imagePromises = Array.from(document.images).map((img) => {
        if (img.complete) return;
        return new Promise((resolve) => {
          img.addEventListener("load", resolve);
          img.addEventListener("error", resolve);
        });
      });

      // -------------------------
      // WAIT FOR ANIMATIONS
      // -------------------------
      const animationPromises = Array.from(
        document.querySelectorAll("*")
      ).map((element) => {
        const style = window.getComputedStyle(element);
        const dur = parseFloat(style.animationDuration) || 0;
        const delay = parseFloat(style.animationDelay) || 0;
        const total = (dur + delay) * 1000;

        if (total > 0) {
          return new Promise((resolve) => setTimeout(resolve, total));
        }
      });

      // -------------------------
      // WAIT FOR SCROLLING TO FINISH
      // -------------------------
      const waitForScrollEnd = new Promise((resolve) => {
        let timer;
        let lastY = window.scrollY;

        const onScroll = () => {
          clearTimeout(timer);
          timer = setTimeout(() => {
            if (window.scrollY === lastY) {
              window.removeEventListener("scroll", onScroll);
              resolve(true);
            } else {
              lastY = window.scrollY;
            }
          }, 350);
        };

        window.addEventListener("scroll", onScroll);
        onScroll(); // run immediately in case scroll already happened
      });

      // -------------------------
      // FINAL WAIT
      // -------------------------
      await Promise.all([
        ...imagePromises,
        ...animationPromises,
        waitForScrollEnd,
      ]);
    });

    // ----- TAKE STABLE SCREENSHOT -----
    const screenshotBuffer = await page.screenshot({ fullPage: true });
    return screenshotBuffer;
  } catch (error) {
    console.error('Error capturing screenshot with Puppeteer:', error);
    throw new Error('Failed to capture screenshot');
  } finally {
    if (browser) await browser.close();
  }
}; 
