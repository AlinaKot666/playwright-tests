class RegistrationPage {
    constructor(page) {
        this.page = page;

        // кнопка Sign up
        this.signUpButton = page.getByRole('button', { name: 'Sign up' });

        // поля формы регистрации
        this.nameInput = page.locator('#signupName');
        this.lastNameInput = page.locator('#signupLastName');
        this.emailInput = page.locator('#signupEmail');
        this.passwordInput = page.locator('#signupPassword');
        this.repeatPasswordInput = page.locator('#signupRepeatPassword');

        // кнопка Register
        this.registerButton = page.getByRole('button', { name: 'Register' });
    }

    // открыть сайт
    async open() {
        await this.page.goto('/');
    }

    // открыть форму регистрации
    async openRegistrationForm() {
        await this.signUpButton.click();

        // ожидание появления формы
        await this.nameInput.waitFor();
    }

    // регистрация пользователя
    async register(name, lastName, email, password) {

        await this.nameInput.fill(name);
        await this.lastNameInput.fill(lastName);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.repeatPasswordInput.fill(password);

        await this.registerButton.click();
    }
}

module.exports = RegistrationPage;