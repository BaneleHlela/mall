import { chromium } from 'playwright';

const FRONTEND = 'http://localhost:5173';
const layoutId = process.argv[2];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });

await page.goto(`${FRONTEND}/layouts/${layoutId}`, { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);

await page.screenshot({ path: 'C:/Users/banel/AppData/Local/Temp/claude/c--Users-banel-Desktop-the-mall/91f4a3c3-dab6-4985-8d36-7aaa4e407f5d/scratchpad/step0.png' });

const menubarCount = await page.getByText('Menubar', { exact: true }).count();
console.log('Menubar text matches:', menubarCount);

await page.getByText('Menubar', { exact: true }).first().click();
await page.waitForTimeout(800);
await page.screenshot({ path: 'C:/Users/banel/AppData/Local/Temp/claude/c--Users-banel-Desktop-the-mall/91f4a3c3-dab6-4985-8d36-7aaa4e407f5d/scratchpad/step1.png' });

const topbarCount = await page.getByText('Topbar', { exact: true }).count();
console.log('Topbar text matches:', topbarCount);

await browser.close();
