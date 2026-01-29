import { test, expect } from '@playwright/test';

test('CMS admin login', async ({ page }) => {
  await page.goto('http://admin.localhost:3000/admin');

  await page.getByLabel('Email').fill('shobhit.worksdelight@gmail.com');
  await page.getByLabel('Password').fill('shobhitsingh615');

  await page.getByRole('button', { name: /login/i }).click();

  // ✅ Sidebar = logged in
  await expect(page.locator('nav').first()).toBeVisible({ timeout: 15000 });

  // ✅ Collections title (h2, not h1)
  await expect(
    page.locator('h2', { hasText: 'Collections' })
  ).toBeVisible({ timeout: 15000 });
});
