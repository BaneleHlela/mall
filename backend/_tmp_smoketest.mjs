import { chromium } from 'playwright';

const FRONTEND = 'http://localhost:5173';
const results = [];

function log(name, ok, detail) {
  results.push({ name, ok, detail });
  console.log(`${ok ? 'PASS' : 'FAIL'} — ${name}${detail ? ': ' + detail : ''}`);
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });

page.on('pageerror', (err) => console.log('PAGE ERROR:', err.message));
page.on('console', (msg) => {
  if (msg.type() === 'error') console.log('CONSOLE ERROR:', msg.text());
});

// ---------- Test 1: OrderDnD drag-reorder in MenubarWithSearchbarSettings ----------
try {
  const layoutId = process.argv[2];
  await page.goto(`${FRONTEND}/layouts/${layoutId}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  // Open "Menubar" nav item (left settings nav)
  await page.getByText('Menubar', { exact: true }).first().click();
  await page.waitForTimeout(500);

  // Open "Topbar" sub-settings
  await page.getByText('Topbar', { exact: true }).first().click();
  await page.waitForTimeout(500);

  // The "Order" OrderDnD is the second OrderDnD group (after "Stack")
  const orderLabel = page.getByText('Order', { exact: true });
  await orderLabel.waitFor({ timeout: 5000 });

  // Grab draggable items under the "Order" group specifically (find by structure: label + next sibling div items)
  const orderGroup = page.locator('div', { has: page.getByText('Order', { exact: true }) }).last();
  const items = page.locator('p.cursor-move, div.cursor-move').filter({ hasText: /.+/ });

  // Simpler: get all cursor-move draggable blocks on the page (there are two OrderDnD groups: Stack, Order)
  const draggables = page.locator('div.cursor-move');
  const count = await draggables.count();
  log('OrderDnD renders draggable items', count > 0, `found ${count} draggable elements`);

  if (count >= 4) {
    // Assume last group (Order) is the last N items; get text of all, then drag within last group
    const allTexts = await draggables.allTextContents();
    console.log('All draggable texts:', allTexts);

    // Target the LAST group's first two items (Order group, since it's rendered after Stack)
    const groupSize = count / 2; // Stack and Order likely have the same item set size
    const startIdx = count - groupSize; // first item of the "Order" group
    const first = draggables.nth(startIdx);
    const second = draggables.nth(startIdx + 1);

    const beforeTexts = (await draggables.allTextContents()).slice(startIdx);

    const firstBox = await first.boundingBox();
    const secondBox = await second.boundingBox();

    await page.mouse.move(firstBox.x + firstBox.width / 2, firstBox.y + firstBox.height / 2);
    await page.mouse.down();
    await page.mouse.move(firstBox.x + firstBox.width / 2 + 10, firstBox.y + firstBox.height / 2, { steps: 5 });
    await page.mouse.move(secondBox.x + secondBox.width / 2 + 20, secondBox.y + secondBox.height / 2, { steps: 10 });
    await page.mouse.up();
    await page.waitForTimeout(800);

    const afterTexts = (await draggables.allTextContents()).slice(startIdx);
    log('Drag changes item order in DOM', JSON.stringify(beforeTexts) !== JSON.stringify(afterTexts), `before=${JSON.stringify(beforeTexts)} after=${JSON.stringify(afterTexts)}`);

    // Wait for autosave PUT and check response
    let saved = false;
    page.on('response', (resp) => {
      if (resp.request().method() === 'PUT' && resp.url().includes(`/layouts/${layoutId}`)) {
        saved = resp.ok();
      }
    });
    await page.waitForTimeout(2500);

    // Reload and verify persistence
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);
    await page.getByText('Menubar', { exact: true }).first().click();
    await page.waitForTimeout(500);
    await page.getByText('Topbar', { exact: true }).first().click();
    await page.waitForTimeout(500);
    const draggables2 = page.locator('div.cursor-move');
    const afterReloadTexts = (await draggables2.allTextContents()).slice(startIdx);
    log('Reordered order persists after reload', JSON.stringify(afterReloadTexts) === JSON.stringify(afterTexts), `afterReload=${JSON.stringify(afterReloadTexts)}`);
  } else {
    log('Enough draggable items to test reorder', false, `only found ${count}`);
  }
} catch (e) {
  log('OrderDnD smoke test crashed', false, e.message);
}

await browser.close();

console.log('\n=== SUMMARY ===');
for (const r of results) console.log(`${r.ok ? 'PASS' : 'FAIL'} - ${r.name}`);
