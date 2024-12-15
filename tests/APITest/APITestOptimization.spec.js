const { test, expect, request } =require ("@playwright/test");
const APIUtils  =require ("../../Utils/APIUtils.js");

let token;
let apiContext;
let OrderResponse;
let  apiUtilsInstance
test.beforeAll(async() =>{
apiContext= await request.newContext();
 apiUtilsInstance = new APIUtils(apiContext);
token=await apiUtilsInstance.getToken()

})



test("API:place the order Test", async ({ page }) => {
    
    page.addInitScript(value => {
        window.localStorage.setItem("token",value);
    },token);

    await page.goto("https://rahulshettyacademy.com/client/");
    const productName = "ZARA COAT 3";
    const productNames = await page.locator(".card-body h5 b").allTextContents();
     console.log(productNames);
     console.log(productNames.length);
     expect(productNames.length).toBeGreaterThan(0);
     expect(productNames).toContain(productName);
     await page.waitForTimeout(1000);
     await page.locator("div.card").filter({ hasText: "ZARA COAT 3" }).getByRole("button",{name:"Add to cart"}).click();
     await page.locator("button[routerlink*='cart']").click();
     const product = await page.waitForSelector("h3:has-text('ZARA COAT 3')", {
        timeout: 2000,
      });
      expect(product.isVisible()).toBeTruthy();
      page.getByRole("button", { name: "Checkout" }).click();
      await page.waitForTimeout(1000);
      OrderResponse=await apiUtilsInstance.createOrder(token)
      console.log(OrderResponse);
      expect(OrderResponse.data.message).toBe("Order Placed Successfully")
});