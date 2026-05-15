const { test, expect } = require('@playwright/test');
const RegistrationPage = require('../pages/RegistrationPage');

test('User registration', async ({ page }) => {

    const registrationPage = new RegistrationPage(page);

    // открыть сайт
    await registrationPage.open();

    // открыть форму регистрации
    await registrationPage.openRegistrationForm();

    // уникальный email
    const randomEmail = `alina${Date.now()}@test.com`;

    // регистрация
    await registrationPage.register(
        'Alina',
        'Kot',
        randomEmail,
        'Password123'
    );

    // проверка успешной регистрации
    await expect(page).toHaveURL(/garage/);
});