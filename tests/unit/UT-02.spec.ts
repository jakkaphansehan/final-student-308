import { test, expect } from '@playwright/test';

test('UT-02: product button state Add to cart -> Remove -> Add to cart', {
  annotation: {
    type: 'description',
    description: 'ตรวจสอบสถานะปุ่ม Add to cart และ Remove รวมถึง Cart Badge'
  }
}, async ({ page }) => {
  await test.step('Login เข้าสู่ระบบ', async () => {
    await page.goto('/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.locator('.inventory_item')).toHaveCount(6);
  });

  const backpack = page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Backpack' });
  const cartBadge = page.locator('.shopping_cart_badge');

  await test.step('ตรวจสอบปุ่มก่อนเพิ่มสินค้า', async () => {
    await expect(backpack.getByRole('button', { name: 'Add to cart' })).toBeVisible();
    await expect(cartBadge).toHaveCount(0);
  });
  await test.step('เพิ่มสินค้าเข้า Cart', async () => {
    await backpack.getByRole('button', { name: 'Add to cart' }).click();
    await expect(backpack.getByRole('button', { name: 'Remove' })).toBeVisible();
    await expect(cartBadge).toHaveText('1');
  });
  await test.step('ลบสินค้าออกจาก Cart', async () => {
    await backpack.getByRole('button', { name: 'Remove' }).click();
    await expect(backpack.getByRole('button', { name: 'Add to cart' })).toBeVisible();
    await expect(cartBadge).toHaveCount(0);
  });
});
