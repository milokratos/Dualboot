const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');
const { CategoriesPage } = require('../pages/categoriesPage');

let loginPage;
let categoriesPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.visit();
});

test('Verify that all categories exist (Phones, Laptops, Monitors', async ({ page }) => {
    loginPage = new LoginPage(page);
    categoriesPage = new CategoriesPage(page);
    const userName = 'admin';
    const password = 'admin';

    await loginPage.login(userName, password);
    await expect(loginPage.welcomeText).toHaveText('Welcome admin');
    await expect(categoriesPage.phonesLink).toBeVisible();
    await expect(categoriesPage.laptopsLink).toBeVisible();
    await expect(categoriesPage.monitorsLink).toBeVisible();
})

test('Verify that each category contains the right products', async ({ page }) => {
    loginPage = new LoginPage(page);
    const userName = 'admin';
    const password = 'admin';

    await loginPage.login(userName, password);
    await expect(loginPage.welcomeText).toHaveText('Welcome admin');
    categoriesPage = new CategoriesPage(page);
    const categories = ['Phones', 'Laptops', 'Monitors'];

    for (const category of categories) {
        await categoriesPage.selectCategory(category);
        await page.waitForTimeout(2000);
        // Ensure the product list is loaded after selecting the category
        await categoriesPage.productList.waitFor({ state: 'visible' });
        const productTitles = await categoriesPage.getProductTitles();

        expect(productTitles.length).toBeGreaterThan(0);

        for (const title of productTitles) {
            const matches = categoriesPage.matchesCategory(title, category);
            expect(matches).toBe(true, `Product "${title}" does not match category "${category}".`);
        }
    }
});