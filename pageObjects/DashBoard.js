
class DashBoard
{
    constructor(page)
    {
        this.page=page
        this.productNames = page.locator(".card-body h5 b")
        this.addToCartButton = page.locator("div.card-body  button.w-10")
        this.cartButton = page.locator("[routerlink*='cart']")

    }

    async getProductNames()
    {
        const productNames = await this.productNames.allTextContents()
        return productNames
    }

    async addProductToCart(productName)
    {
        const products = await this.getProductNames()
        const index = products.indexOf(productName)   
        await this.addToCartButton.nth(index).click()
    }

    async navigateToCartPage()
    {
        await this.cartButton.click()
    }
}

module.exports = {DashBoard}