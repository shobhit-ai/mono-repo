import { test, expect } from '@playwright/test';

test('CMS frontend home page full selectors including Footer, Award, and Jurnal', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });

  await page.goto('/');

  await expect(page.locator('.main-header')).toBeVisible();

  await expect(page.locator('.hero-section')).toBeVisible();

  await expect(page.locator('.cursor-view-project-label')).toHaveCount(1);

  await expect(page.locator('.home-intro-wrapper')).toBeVisible()

  const darkModeBtn = page.locator('.theme-toggle');
  await expect(darkModeBtn).toBeVisible();

  await darkModeBtn.click();
  await darkModeBtn.click(); 

  await page.setViewportSize({ width: 375, height: 800 });

  const awardSection = page.locator('.awards-title'); 
  await expect(awardSection).toBeVisible();

  const journalCards = page.locator('.journal-card');
  await expect(journalCards.first()).toBeVisible();

  const footer = page.locator('footer');
  await expect(footer).toBeVisible();
});


