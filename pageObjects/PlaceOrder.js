class PlaceOrder
{
    constructor(page)
    {
        this.page=page
        this.emailText=page.locator(".user__name.mt-5 label")
        this.dropDown=page.getByPlaceholder("Select Country")
        this.placeOrder=page.locator(".action__submit")
    }

    getEmailText()
    {
        return this.emailText.textContent()
    }

    async selectCountry(country)
    {
        await this.dropDown.pressSequentially(country)
        const countryButton = this.page.getByRole("button", {name:country });
         await countryButton.click();
    }

    ClickOnplaceOrder()
    {
        this.placeOrder.click()
    }
}

module.exports={PlaceOrder}