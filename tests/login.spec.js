const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');

let loginPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.visit();
});

test('Verify valid login credentials', async ({ page }) => {
    loginPage = new LoginPage(page);
    const userName = 'admin';
    const password = 'admin';

    await loginPage.login(userName, password);
    await expect(loginPage.welcomeText).toHaveText('Welcome admin');
})

test('Verify invalid login credentials', async ({ page }) => {
    loginPage = new LoginPage(page);
    const invalidUsername = 'jtirado';
    const invalidPassword = 'invalidPass';

    // Set up dialog handler
    const dialogPromise = new Promise(resolve => {
        page.on('dialog', async dialog => {
            const message = dialog.message();
            await dialog.accept();
            resolve(message);
        });
    });

    await loginPage.login(invalidUsername, invalidPassword);
    const dialogMessage = await dialogPromise;
    await expect(dialogMessage).toBe('User does not exist.');
})