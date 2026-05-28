const { test, expect } = require('../fixtures/userGaragePage.fixture');

test('Garage page is opened for logged user', async ({ userGaragePage }) => {
    await expect(userGaragePage.addCarButton).toBeVisible();
});