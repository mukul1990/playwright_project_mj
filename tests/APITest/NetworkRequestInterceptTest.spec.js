import { test, expect, request } from "@playwright/test";


test("API:Netwrok request intercept Test", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill("mukuljain@gmail.com");
  await page.locator("#userPassword").fill("Automation@123");
  await page.locator("[value='Login']").click();
  await page.waitForLoadState("networkidle");
  await page.locator(".card-body b").first().waitFor();
  await page.locator("button[routerlink*='myorders']").click();
  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    (route) =>
      route.continue({
        url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=67136f19ae2afd4c0ba0ccf466",
      })
  );
  await page.waitForTimeout(3000);
  await page.locator("button:has-text('View')").first().click();

  await expect(page.locator("p").last()).toHaveText(
    "You are not authorize to view this order"
  );
});

test("API:Netwrok route abort Test", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
 await  page.route("**/*.{css,png,jpg}", route=> route.abort());
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill("mukuljain@gmail.com");
  await page.locator("#userPassword").fill("Automation@123");
  await page.locator("[value='Login']").click();
  page.on('request',request=>{
    console.log(request.url())
  })
  page.on('response',response=>{
    console.log(response.url()),
    console.log(response.status())
  })
  console.log(await page.title());
  page.waitForTimeout(1000)
  await page.locator("button[routerlink*='myorders']").click();
  await page.locator("button:has-text('View')").first().click()
  //await  page.route("**/*.{css,,png,jpg}", route=> route.abort());

})
  