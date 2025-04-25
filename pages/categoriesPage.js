export class CategoriesPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;

        this.phonesLink = page.locator('a:has-text("Phones")');
        this.laptopsLink = page.locator('a:has-text("Laptops")');
        this.monitorsLink = page.locator('a:has-text("Monitors")');
        this.productList = page.locator('#tbodyid');
        this.productTitles = page.locator('#tbodyid .card-title a.hrefch');


        this.categoryLinks = {
            phones: this.phonesLink,
            laptops: this.laptopsLink,
            monitors: this.monitorsLink
        };
    }

    async selectCategory(category) {
        const key = category.toLowerCase(); // ensure lowercase
        const categoryLink = this.categoryLinks[key];

        if (!categoryLink) {
            throw new Error(`Category "${category}" is not supported.`);
        }

        await categoryLink.click();
        await this.productList.waitFor({ state: 'visible' });
    }

    async getProductTitles() {
        const titles = await this.productTitles.allTextContents();
        return titles.map(t => t.trim());
    }

    matchesCategory(title, category) {
        const lcTitle = title.toLowerCase();
        const lcCategory = category.toLowerCase();

        const keywords = {
            phones: ['galaxy', 'nokia', 'nexus', 'iphone', 'xperia', 'htc'],
            laptops: ['vaio', 'macbook', 'dell'],
            monitors: ['apple', 'asus']
        };

        // Log the keywords for debugging purposes
        console.log(`Category: ${lcCategory}, Keywords: ${keywords[lcCategory]}`);

        return keywords[lcCategory]?.some(keyword => lcTitle.includes(keyword)) || false;
    }
}