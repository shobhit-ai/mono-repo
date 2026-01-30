import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 60000, // 1 min per test
  testDir: './tests/e2e', // root test folder
  workers: 1,
  use: {
    headless: false, // browser opens, set true for CI
    viewport: { width: 1280, height: 720 },
  },
  projects: [
    {
      name: 'cms-admin',
      testDir: './tests/e2e/apps-cms/admin',
      use: {
        baseURL: 'http://admin.localhost:3000/admin',
      },
    },
    {
      name: 'cms-frontend',
      testDir: './tests/e2e/apps-cms/frontend',
      use: {
        baseURL: 'http://localhost:3000',
      },
    },
    {
      name: 'cms-api',
      testDir: './tests/e2e/apps-cms/api',
      use: {
        baseURL: 'http://localhost:3000',
      },
    },
  ],
});
