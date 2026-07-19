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
  await page.goto(`${FRONTEND}/stores/${slug}/services`, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await page.waitForTimeout(3000);
  const bookButtons = page.getByText('Book Now', { exact: true });
  await bookButtons.nth(1).click();
  await page.waitForTimeout(1500);

  // --- Service Listbox ---
  const serviceListboxBtn = page.locator('button, [role="button"]').filter({ hasText: /Driving Lesson|Learner|Test Card/ }).first();
  const beforeServiceText = await serviceListboxBtn.textContent();
  await serviceListboxBtn.click();
  await page.waitForTimeout(400);
  const options = page.locator('[role="option"], li').filter({ hasText: /.+/ });
  const optCount = await options.count();
  log('Service Listbox opens with options', optCount > 0, `found ${optCount} options`);

  if (optCount > 1) {
    // pick an option different from current, scrolled into view first
    let picked = false;
    for (let i = 0; i < optCount; i++) {
      const opt = options.nth(i);
      const txt = (await opt.textContent())?.trim();
      if (txt && !beforeServiceText?.includes(txt)) {
        await opt.scrollIntoViewIfNeeded();
        await opt.click({ force: true });
        picked = true;
        break;
      }
    }
    await page.waitForTimeout(500);
    const afterServiceText = await serviceListboxBtn.textContent();
    log('Selecting a service option updates the field', picked && afterServiceText !== beforeServiceText, `before="${beforeServiceText}" after="${afterServiceText}"`);
  }

  // --- Staff Listbox ---
  const staffListboxBtn = page.locator('button, [role="button"]').filter({ hasText: /Washington|Staff|Any/ }).first();
  const staffVisible = await staffListboxBtn.count() > 0;
  log('Staff selector present', staffVisible);
  if (staffVisible) {
    const beforeStaffText = await staffListboxBtn.textContent();
    await staffListboxBtn.click();
    await page.waitForTimeout(400);
    const staffOptions = page.locator('[role="option"], li').filter({ hasText: /.+/ });
    const staffOptCount = await staffOptions.count();
    log('Staff Listbox opens with options', staffOptCount > 0, `found ${staffOptCount} options`);
    if (staffOptCount > 0) {
      await staffOptions.first().scrollIntoViewIfNeeded();
      await staffOptions.first().click({ force: true });
      await page.waitForTimeout(400);
    }
  }

  // --- Date selection ---
  const dateCell = page.locator('button, td, abbr').filter({ hasText: /^\d{1,2}$/ }).filter({ hasNotText: '' });
  // pick a day in the calendar that's not disabled — target text "10" as a safe mid-month pick
  const dayButtons = page.getByText(/^\d{1,2}$/, { exact: true });
  const dayCount = await dayButtons.count();
  log('Calendar renders day cells', dayCount > 0, `found ${dayCount} day cells`);

  let dateSelected = false;
  for (let i = 0; i < dayCount; i++) {
    const el = dayButtons.nth(i);
    const disabled = await el.evaluate((n) => {
      const btn = n.closest('button');
      return btn ? btn.disabled : false;
    }).catch(() => false);
    if (!disabled) {
      await el.click({ force: true });
      dateSelected = true;
      break;
    }
  }
  await page.waitForTimeout(800);
  const selectedDateText = await page.getByText(/Selected Date:/).textContent().catch(() => null);
  log('Selecting a date updates "Selected Date"', dateSelected && selectedDateText && !selectedDateText.includes('None'), `${selectedDateText}`);

  await page.screenshot({ path: 'C:/Users/banel/AppData/Local/Temp/claude/c--Users-banel-Desktop-the-mall/91f4a3c3-dab6-4985-8d36-7aaa4e407f5d/scratchpad/booking_after_interactions.png', fullPage: true });

} catch (e) {
  log('Listbox/date test crashed', false, e.message);
}

await browser.close();
console.log('\n=== SUMMARY ===');
for (const r of results) console.log(`${r.ok ? 'PASS' : 'FAIL'} - ${r.name}`);
