import { chromium } from 'playwright';

const FRONTEND = 'http://localhost:5173';
const slug = process.argv[2];
const results = [];
function log(name, ok, detail) {
  results.push({ name, ok, detail });
  console.log(`${ok ? 'PASS' : 'FAIL'} — ${name}${detail ? ': ' + detail : ''}`);
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
page.on('pageerror', (err) => console.log('PAGE ERROR:', err.message));

try {
  await page.goto(`${FRONTEND}/stores/${slug}/services`, { waitUntil: 'networkidle', timeout: 45000 });
  await page.waitForTimeout(1200);

  const bookButtons = page.getByText('Book Now', { exact: true });
  const bookButtonCount = await bookButtons.count();
  console.log('Book Now button count:', bookButtonCount);
  // index 0 is the navbar's global "Book Now" button; the service cards start after it
  await bookButtons.nth(1).click();
  await page.waitForTimeout(1500);
  const url = page.url();
  log('Clicking service "Book Now" navigates to a booking page', /\/service\//.test(url), `url=${url}`);

  await page.screenshot({ path: 'C:/Users/banel/AppData/Local/Temp/claude/c--Users-banel-Desktop-the-mall/91f4a3c3-dab6-4985-8d36-7aaa4e407f5d/scratchpad/booking_page2.png', fullPage: true });

  // Look for a Headless UI Listbox button (role="button" with aria-haspopup="listbox" or similar structure)
  const listboxButtons = page.locator('[role="button"], button').filter({ hasText: /.+/ });
  const count = await listboxButtons.count();
  log('Booking page has interactive controls', count > 0, `found ${count} button-like elements`);

} catch (e) {
  log('Booking flow test crashed', false, e.message);
}

await browser.close();
console.log('\n=== SUMMARY ===');
for (const r of results) console.log(`${r.ok ? 'PASS' : 'FAIL'} - ${r.name}`);
