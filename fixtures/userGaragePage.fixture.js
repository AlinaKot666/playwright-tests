const base = require('@playwright/test');
const { GaragePage } = require('../pages/GaragePage');

exports.test = base.test.extend({
    userGaragePage: async ({ browser }, use) => {
        const context = await browser.newContext({
            storageState: './auth/user.json',
        });

        const page = await context.newPage();

        const garagePage = new GaragePage(page);

        await garagePage.open();

        await use(garagePage);

        await context.close();
    },
});

exports.expect = base.expect;