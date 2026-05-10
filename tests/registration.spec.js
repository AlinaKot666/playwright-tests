const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('https://qauto.forstudy.space/');
});

test('Open homepage', async ({ page }) => {
  await expect(page).toHaveTitle(/Hillel/);
});

test('Sign In button visible', async ({ page }) => {
  await expect(
    page.getByRole('button', { name: 'Sign In' })
  ).toBeVisible();
});

test('Guest log in button visible', async ({ page }) => {
  await expect(
    page.getByRole('button', { name: 'Guest log in' })
  ).toBeVisible();
});

test('Registration button works', async ({ page }) => {
  await page.getByRole('button', { name: 'Sign In' }).click();

  await expect(
    page.getByRole('button', { name: 'Registration' })
  ).toBeVisible();
});

test('Registration modal opens', async ({ page }) => {
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('button', { name: 'Registration' }).click();

  await expect(page.locator('#signupName')).toBeVisible();
});

test('Name field visible', async ({ page }) => {
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('button', { name: 'Registration' }).click();

  await expect(page.locator('#signupName')).toBeVisible();
});