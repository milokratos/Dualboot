export class ShoppingCartPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;

        this.productClick = page.getByRole('link', { name: 'Samsung galaxy s6' });
        this.addToCartButton = page.getByRole('link', { name: 'Add to cart' });
        this.goToCart = page.getByRole('link', { name: 'Cart', exact: true });
        this.placeOrderButton = page.getByRole('button', { name: 'Place Order' });
        this.nameInput = page.locator('[id="name"]');
        this.countryInput = page.locator('[id="country"]');
        this.cityInput = page.locator('[id="city"]');
        this.creditCartInput = page.locator('[id="card"]');
        this.monthInput = page.getByRole('textbox', { name: 'Month:' });
        this.yearInput = page.getByRole('textbox', { name: 'Year:' });
        this.purchaseButton = page.getByRole('button', { name: 'Purchase' });
        this.okButton = page.getByRole('button', { name: 'OK' });
        this.purchaseMessage = page.getByRole('heading', { name: 'Thank you for your purchase!' });
        this.goHomePage = page.getByRole('link', { name: 'PRODUCT STORE' });
        this.cartPrice = page.locator('[id="totalp"]');
    }
}