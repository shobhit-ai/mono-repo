import { test, expect } from '@playwright/test'

test.describe('Blog List Page', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/Blog')
    })

    test('should load blog list page', async ({ page }) => {
        await expect(page).toHaveURL(/Blog/)
    })

    test('should show page heading and description', async ({ page }) => {
        await expect(
            page.getByRole('heading', { name: 'Blogs' })
        ).toBeVisible()

        await expect(
            page.getByText('Read the latest blogs, tutorials, and updates')
        ).toBeVisible()
    })

    test('should have correct meta title', async ({ page }) => {
       await expect(page).toHaveTitle(/Blogs/)
    })

    test('should render blog list', async ({ page }) => {
        const blogCards = page.locator('[data-testid="blog-card"]')
        const count = await blogCards.count()
        expect(count).toBeGreaterThan(0)
    })

    test('each blog card should have title and link', async ({ page }) => {
        const firstBlog = page.locator('[data-testid="blog-card"]').first()

        await expect(firstBlog.getByRole('heading')).toBeVisible()
        await expect(firstBlog.getByRole('link')).toBeVisible()
    })

    test('should navigate to blog detail page', async ({ page }) => {
        const firstBlogLink = page
            .locator('[data-testid="blog-card"]')
            .first()
            .getByRole('link')

        await firstBlogLink.click()
        await expect(page).toHaveURL(/Blog\/.+/)
    })
})
