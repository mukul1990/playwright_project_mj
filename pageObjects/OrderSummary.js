class OrderSummary{

    constructor(page){  
        this.page = page;
        this.orderDetails=page.locator("div.col-text.-main")
    }

   async  getOrderDetails()
    {
        const orderDetails=await this.orderDetails.textContent();
        return orderDetails
    }
}

module.exports={OrderSummary}