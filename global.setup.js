require('dotenv').config();

const { chromium } = require('@playwright/test');

async function globalSetup() {
    const browser = await chromium.launch();

    const context = await browser.newContext({
        httpCredentials: {
            username: process.env.HTTP_USERNAME,
            password: process.env.HTTP_PASSWORD,
        },
    });

    const page = await context.newPage();

    await page.goto(process.env.BASE_URL);

    await page.waitForLoadState('networkidle');

    await page.getByRole('button', { name: 'Sign In' }).click();

    await page.waitForSelector('#signinEmail');

    await page.locator('#signinEmail').fill(process.env.EMAIL);

    await page.locator('#signinPassword').fill(process.env.PASSWORD);

    await page.getByRole('button', { name: 'Login' }).click();

    await page.waitForURL('**/panel/garage');

    await context.storageState({
        path: './auth/user.json',
    });

    await browser.close();
}

module.exports = globalSetup;