import { test, expect } from '@playwright/test';

test.describe('CMS Blog API', () => {
  test('GET /api/blog returns blog list', async ({ request }) => {
    const response = await request.get('/api/blog');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('docs');
    expect(Array.isArray(body.docs)).toBeTruthy();
  });

  test('blog item has required fields', async ({ request }) => {
    const response = await request.get('/api/blog');
    const body = await response.json();
    const blog = body.docs[0];
    expect(blog).toHaveProperty('id');
    expect(blog).toHaveProperty('title');
  });
});
