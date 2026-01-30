import { test, expect } from '@playwright/test'

test.describe('BlogGrid Component (E2E)', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/Blog')
    await page.waitForLoadState('networkidle')
  })

  test('should render blog cards', async ({ page }) => {
    const cards = page.locator('[data-testid="blog-card"]')

    const count = await cards.count()
    expect(count).toBeGreaterThan(0)
  })

  test('each blog card should have title and description', async ({ page }) => {
    const firstCard = page.locator('[data-testid="blog-card"]').first()

    await expect(firstCard.locator('h2')).toBeVisible()
    await expect(firstCard.locator('p')).toBeVisible()
  })

  test('blog card should show Read More link', async ({ page }) => {
    const readMoreLink = page
      .locator('[data-testid="blog-card"]')
      .first()
      .getByRole('link', { name: /read more/i })

    await expect(readMoreLink).toBeVisible()
  })

  test('should navigate to blog detail page on Read More click', async ({ page }) => {
    const firstLink = page
      .locator('[data-testid="blog-card"]')
      .first()
      .getByRole('link', { name: /read more/i })

    await firstLink.click()

    await expect(page).toHaveURL(/\/Blog\/.+/)
  })

  test('blog image should be visible if featured image exists', async ({ page }) => {
    const image = page
      .locator('[data-testid="blog-card"]')
      .first()
      .locator('img')

    if (await image.count()) {
      await expect(image).toBeVisible()
    }
  })
})
