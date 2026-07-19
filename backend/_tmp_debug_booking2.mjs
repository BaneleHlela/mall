import { chromium } from 'playwright';

const FRONTEND = 'http://localhost:5173';
const slug = process.argv[2];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });

await page.goto(`${FRONTEND}/stores/${slug}/services`, { waitUntil: 'networkidle', timeout: 45000 });
await page.waitForTimeout(1500);
await page.screenshot({ path: 'C:/Users/banel/AppData/Local/Temp/claude/c--Users-banel-Desktop-the-mall/91f4a3c3-dab6-4985-8d36-7aaa4e407f5d/scratchpad/services0.png', fullPage: true });
console.log('URL after services load:', page.url());

await browser.close();
