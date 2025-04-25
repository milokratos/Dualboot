// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['list'], // Show test results in the console during the run
    ['html', { open: 'never' }], // Generate an HTML report, don’t auto-open
  ],
  /* Shared settings for all projects */
  use: {
    /* Base URL for UI tests */
    baseURL: 'https://www.demoblaze.com',
    /* Collect trace when retrying a failed test */
    trace: 'on-first-retry',
    /* Turn off video recording */
    video: 'off',
  },

  /* Define projects for UI and API tests */
  projects: [
    /* UI Tests: Run in multiple browsers */
    {
      name: 'UI Chromium',
      testDir: './tests',
      testIgnore: 'tests/apiTesting/**', // Exclude API tests
      use: {
        ...devices['Desktop Chrome'],
        screenshot: 'only-on-failure', // Capture screenshots only on failure
      },
    },
    {
      name: 'UI Firefox',
      testDir: './tests',
      testIgnore: 'tests/apiTesting/**',
      use: {
        ...devices['Desktop Firefox'],
        screenshot: 'only-on-failure',
      },
    },
    {
      name: 'UI WebKit',
      testDir: './tests',
      testIgnore: 'tests/apiTesting/**',
      use: {
        ...devices['Desktop Safari'],
        screenshot: 'only-on-failure',
      },
    },
    /* API Tests: Don’t use a browser, no screenshots */
    {
      name: 'API Tests',
      testDir: './tests/apiTesting',
      use: {
        // API tests don’t need a browser, but Playwright requires a browser context
        browserName: 'chromium',
        headless: true,
        screenshot: 'off', // No screenshots for API tests
        trace: 'off', // No tracing for API tests
      },
    },
  ],
});