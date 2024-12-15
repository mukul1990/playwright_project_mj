const { test, expect } = require("@playwright/test");

test("client app login failure Test", async ({ page }) => {
  page.goto("https://rahulshettyacademy.com/client/");

  const email = page.locator("#userEmail");
  const password = page.locator("#userPassword");
  const loginBtn = page.locator("#login");
  await email.fill("mukul.jain@gmail.com");
  await password.fill("Automation");

  await loginBtn.click();
  await page.waitForSelector("[aria-label='Incorrect email or password.']", {
    timeout: 5000,
  });
  const errorMsg = await page.textContent(
    "[aria-label='Incorrect email or password.']"
  );
  console.log(errorMsg);
  expect(errorMsg).toBe(" Incorrect email or password. ");
});

test("client app login pass Test", async ({ page }) => {
  page.goto("https://rahulshettyacademy.com/client/");

  const email = page.locator("#userEmail");
  const password = page.locator("#userPassword");
  const loginBtn = page.locator("#login");
  await email.fill("mukuljain@gmail.com");
  await password.fill("Automation@123");
  await loginBtn.click();
  expect(page).toHaveTitle(new RegExp(".*Shop*."));
});

test.only("client app product order Test", async ({ page }) => {
  page.goto("https://rahulshettyacademy.com/client/");
  const product = "ZARA COAT 3";
  await page.getByPlaceholder("email@example.com").fill("mukuljain@gmail.com");
  await page.getByPlaceholder("enter your passsword").fill("Automation@123");
  await page.getByRole("button", { name: "Login" }).click();
 
  await page.waitForTimeout(1000);
  await page.locator("div.card").filter({ hasText: "ZARA COAT 3" }).getByRole("button",{name:"Add to cart"}).click();

  await page.locator("button[routerlink*='cart']").click();
  //Product name validation in cart
  const productName = await page.waitForSelector("h3:has-text('ZARA COAT 3')", {
    timeout: 2000,
  });
  expect(productName.isVisible()).toBeTruthy();
  expect(productName,{hasText:"ZARA COAT 3"}).toBeTruthy();
  expect(page.getByText(product)).toBeVisible()
  //await page.locator("text='Checkout'").click();
  page.getByRole("button", { name: "Checkout" }).click();
  await page.waitForTimeout(1000);
  //const emailText =  await page.getByLabel("mukuljain@gmail.com").textContent()
  //console.log(emailText);
  //expect(emailText).toContain("mukuljain@gmail.com");
  await page.getByPlaceholder("Select Country").pressSequentially("ind");
  await page.waitForTimeout(1000);
  await page.getByRole("button",{name:"India"}).nth(1).click();

  
  //await page.getByRole("button", { name: "Indonesia" }).click();
  await page.screenshot({ path: "screenshot.png" });
  await page.getByText("PLACE ORDER").click();
  
  await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();
  const orderId = await page
    .locator("label.ng-star-inserted")
    .allTextContents();
  const orderIdValue = orderId[0].replace(/[^a-zA-Z0-9]/g, "");
  console.log(orderIdValue);
  await page.locator("[routerlink*='myorders']").nth(1).click();
  await page.waitForTimeout(2000);
  const rows = await page.locator("tr.ng-star-inserted");
  const rowCount = await rows.count();
  console.log(rowCount);
  for (let i = 0; i < rowCount; i++) {
    const text = await rows.locator("th").nth(i).textContent();
    if (text.includes(orderIdValue)) {
      await rows.locator("td button").nth(0).click();
      break;
    }
  }

  const orderDetails=await page.locator("div.col-text.-main").textContent();
   expect(orderDetails.includes(orderIdValue)).toBeTruthy();
   console.log("Test executed successfully");
});
