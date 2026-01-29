import { test, expect } from '@playwright/test';

test('Manage collections', async ({ page }) => {
  await page.goto('http://admin.localhost:3000/admin');

  await page.getByLabel('Email').fill('shobhit.worksdelight@gmail.com');
  await page.getByLabel('Password').fill('shobhitsingh615');

  await page.getByRole('button', { name: /login/i }).click();

  await expect(
    page.locator('h2', { hasText: 'Collections' })
  ).toBeVisible({ timeout: 15000 });

  const cards = page.locator('.card__title');

  await expect(cards.filter({ hasText: 'Users' })).toBeVisible();
  await expect(cards.filter({ hasText: 'Media' })).toBeVisible();
  await expect(cards.filter({ hasText: 'Blogs' })).toBeVisible();
  await expect(cards.filter({ hasText: 'Tags' })).toBeVisible();
});
