import { test, expect } from '@playwright/test';

test('IT-01: top-down REAL Login -> browser-level Inventory STUB', {
  annotation: {
    type: 'description',
    description: 'ทดสอบ Login จริงร่วมกับ Inventory Stub ที่จำลองด้วย page.setContent()'
  }
}, async ({ page }) => {
  await test.step('Login ผ่านหน้าเว็บไซต์จริง', async () => {
    await page.goto('/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/inventory\.html/);
  });

  await test.step('สร้าง Inventory Stub', async () => {
    await page.setContent(`
      <!doctype html>
      <html lang="en">
        <head><meta charset="UTF-8"><title>Mock Inventory</title></head>
        <body>
          <main>
            <h1>Mock Inventory Ready</h1>
            <ul aria-label="Mock products">
              <li class="mock-product">Mock Backpack</li>
              <li class="mock-product">Mock Bike Light</li>
            </ul>
          </main>
        </body>
      </html>
    `);
  });

  await test.step('ตรวจสอบผลจาก Stub', async () => {
    await expect(page.getByRole('heading', { name: 'Mock Inventory Ready' })).toBeVisible();
    await expect(page.locator('.mock-product')).toHaveCount(2);
    await expect(page.locator('.mock-product').nth(0)).toHaveText('Mock Backpack');
    await expect(page.locator('.mock-product').nth(1)).toHaveText('Mock Bike Light');
  });
});
