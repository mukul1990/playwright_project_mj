class MyCart
{
    constructor(page)
    {
        this.page = page;
        // this.productName = page.waitForSelector("h3:has-text('ZARA COAT 3')", {
        //     timeout: 2000,
        //   });
        this.checkout = page.locator("text='Checkout'");
        this.totalPrice = page.locator(".totalAmount");
    }

    productNameValidation(productName)
    {
        return this.page.getByText(productName);
    }

    navigateToCheckout()
    {
        this.checkout.click();
    }
}

module.exports = {MyCart}