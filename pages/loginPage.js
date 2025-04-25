export class LoginPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;

        this.loginOption = page.locator('[id="login2"]');
        this.userNameInput = page.locator('[id="loginusername"]');
        this.passwordInput = page.locator('[id="loginpassword"]');
        this.loginButton = page.getByRole('button', { name: 'Log in' });
        this.welcomeText = page.locator('[id="nameofuser"]');
    }

    async visit() {
        await this.page.goto("https://www.demoblaze.com/");
    }

    async login(username, password) {
        await this.loginOption.click();
        await this.userNameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}