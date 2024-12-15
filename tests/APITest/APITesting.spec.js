import { test, expect, request } from "@playwright/test";
const loginPayload = {
  userEmail: "mukuljain@gmail.com",
  userPassword: "Automation@123",
};
let token;
test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const loginResponse = await apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/auth/login",
    {
      data: loginPayload,
    }
  );
  console.log(loginResponse);
  console.log(loginResponse.status());
  const statusCode = loginResponse.status();
  if (statusCode === 400) {
    console.error("Bad Request");
  } else if (statusCode === 200) {
    const responseBody = await loginResponse.json();
    console.log(responseBody);
    expect(loginResponse.status()).toBe(200);
    token = responseBody.token;
  } else {
    console.error("Unknown error");
  }
});

test("API:Client API Login Test", async ({ page }) => {
  page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, token);

  await page.goto("https://rahulshettyacademy.com/client/");
  const productName = "ZARA COAT 3";
  const productNames = await page.locator(".card-body h5 b").allTextContents();
  console.log(productNames);
  console.log(productNames.length);
  expect(productNames.length).toBeGreaterThan(0);
  expect(productNames).toContain(productName);

  const pnames = page.locator(".col-lg-4.ng-star-inserted");
  await page.waitForTimeout(1000);

  // Get the filtered products
  const filteredProducts = pnames.filter({ hasText: productName });

  // Find all buttons within the filtered products
  const buttons = filteredProducts.getByRole("button", { name: "Add to cart" });
  await buttons.click();
  await page.locator("button[routerlink*='cart']").click();
  const product = await page.waitForSelector("h3:has-text('ZARA COAT 3')", {
    timeout: 2000,
  });
  expect(product.isVisible()).toBeTruthy();
  page.getByRole("button", { name: "Checkout" }).click();
  await page.waitForTimeout(1000);
  await page.getByPlaceholder("Select Country").pressSequentially("ind");
  await page.waitForTimeout(1000);
  await page.getByRole("button", { name: "India" }).nth(1).click();
  await page.getByText("PLACE ORDER").click();
});
