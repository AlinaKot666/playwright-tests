const { test, expect } = require('@playwright/test');

test('Profile data is mocked', async ({ page }) => {

  await page.route('**/api/users/profile', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        status: 'ok',
        data: {
          userId: 352097,
          photoFilename: 'default-user.png',
          name: 'Super',
          lastName: 'Tester'
        }
      })
    });
  });

  await page.goto('/panel/profile');

  await page.waitForTimeout(2000);

  await expect(page.getByText('Super Tester')).toBeVisible();
});