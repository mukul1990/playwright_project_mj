class OrderConfirmation
{
    constructor(page)
    {
        this.page = page;
        this.orderConfirmation = page.locator(".hero-primary");
        this.orderID=page.locator("tr.ng-star-inserted td label");
        this.orderHistory=page.locator("label[routerlink*='myorders']");
    }

    async getOrderConfirmation()
    {
        const text = await this.orderConfirmation.textContent();
        return text;
    }

    async getOrderId()
    {
        return await this.orderID.textContent();
    }

     async navigateToOrderHistory()
    {
        await  this.orderHistory.click();
    }
}

module.exports = {OrderConfirmation};