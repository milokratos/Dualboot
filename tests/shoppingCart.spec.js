const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');
const { ShoppingCartPage } = require('../pages/shoppingCartPage');

let loginPage;
let shoppingCartPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.visit();
});

test('Add a product to the cart', async ({ page }) => {
    loginPage = new LoginPage(page);
    shoppingCartPage = new ShoppingCartPage(page);
    const userName = 'admin';
    const password = 'admin';

    const dialogPromise = new Promise(resolve => {
        page.on('dialog', async dialog => {
            const message = dialog.message();
            await dialog.accept();
            resolve(message);
        });
    });

    await loginPage.login(userName, password);
    await expect(loginPage.welcomeText).toHaveText('Welcome admin');
    await shoppingCartPage.productClick.click();
    await shoppingCartPage.addToCartButton.click();

    const dialogMessage = await dialogPromise;
    await expect(dialogMessage).toBe('Product added.');
})

test('Verify the checkout and the order was succesfully placed', async ({ page }) => {
    loginPage = new LoginPage(page);
    shoppingCartPage = new ShoppingCartPage(page);
    const userName = 'admin';
    const password = 'admin';

    const dialogPromise = new Promise(resolve => {
        page.on('dialog', async dialog => {
            const message = dialog.message();
            await dialog.accept();
            resolve(message);
        });
    });

    await loginPage.login(userName, password);
    await expect(loginPage.welcomeText).toHaveText('Welcome admin');
    await shoppingCartPage.productClick.click();
    await shoppingCartPage.addToCartButton.click();

    const dialogMessage = await dialogPromise;
    await expect(dialogMessage).toBe('Product added.');

    await shoppingCartPage.goToCart.click();
    await shoppingCartPage.placeOrderButton.click();
    await shoppingCartPage.nameInput.fill('Camilo');
    await shoppingCartPage.countryInput.fill('Colombia');
    await shoppingCartPage.cityInput.fill('Medellin');
    await shoppingCartPage.creditCartInput.fill('4111111111111111');
    await shoppingCartPage.monthInput.fill('03');
    await shoppingCartPage.yearInput.fill('2029');
    await shoppingCartPage.purchaseButton.click();
    await expect(shoppingCartPage.purchaseMessage).toBeVisible();
    await shoppingCartPage.okButton.click();
})

test('Try to buy without a product', async ({ page }) => {
    loginPage = new LoginPage(page);
    shoppingCartPage = new ShoppingCartPage(page);
    const userName = 'admin';
    const password = 'admin';

    await loginPage.login(userName, password);
    await expect(loginPage.welcomeText).toHaveText('Welcome admin');
    await shoppingCartPage.goToCart.click();
    await shoppingCartPage.placeOrderButton.click();
    await shoppingCartPage.nameInput.fill('Camilo');
    await shoppingCartPage.countryInput.fill('Colombia');
    await shoppingCartPage.cityInput.fill('Medellin');
    await shoppingCartPage.creditCartInput.fill('4111111111111111');
    await shoppingCartPage.monthInput.fill('03');
    await shoppingCartPage.yearInput.fill('2029');
    await shoppingCartPage.purchaseButton.click();
    await expect(shoppingCartPage.purchaseMessage).toBeHidden();
    await shoppingCartPage.okButton.click();
})

test('Verify the final price after adding more than one product', async ({ page }) => {
    loginPage = new LoginPage(page);
    shoppingCartPage = new ShoppingCartPage(page);
    const userName = 'admin';
    const password = 'admin';

    const dialogPromise = new Promise(resolve => {
        page.on('dialog', async dialog => {
            const message = dialog.message();
            await dialog.accept();
            resolve(message);
        });
    });

    await loginPage.login(userName, password);
    await expect(loginPage.welcomeText).toHaveText('Welcome admin');
    await shoppingCartPage.productClick.click();
    await shoppingCartPage.addToCartButton.click();

    const dialogMessage = await dialogPromise;
    await expect(dialogMessage).toBe('Product added.');

    await shoppingCartPage.goToCart.click();
    await expect(shoppingCartPage.cartPrice).toHaveText('360')
    await shoppingCartPage.goHomePage.click();

    await shoppingCartPage.productClick.click();
    await shoppingCartPage.addToCartButton.click();
    await shoppingCartPage.goToCart.click();
    await expect(shoppingCartPage.cartPrice).toHaveText('720')
})