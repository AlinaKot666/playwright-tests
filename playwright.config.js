require('dotenv').config();

const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',

  globalSetup: './global.setup.js',

  use: {
    baseURL: process.env.BASE_URL,

    httpCredentials: {
      username: process.env.HTTP_USERNAME,
      password: process.env.HTTP_PASSWORD,
    },

    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});