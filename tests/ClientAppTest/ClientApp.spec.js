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
  const email = page.locator("#userEmail");
  const password = page.locator("#userPassword");
  const loginBtn = page.locator("#login");
  const products = page.locator("div.card-body");
  await email.fill("mukuljain@gmail.com");
  await password.fill("Automation@123");
  await loginBtn.click();
  await page.waitForTimeout(1000);
  const productNames = await page.locator(".card-body h5 b").allTextContents();
  console.log(productNames);

  //Matching product name with array
  for (let i = 0; i < productNames.length; i++) {
    if (productNames[i].includes(product)) {
      await page.locator("div.card-body  button.w-10").nth(i).click();
    }
  }

  await page.locator("button[routerlink*='cart']").click();
  //Product name validation in cart
  const productName = await page.waitForSelector("h3:has-text('ZARA COAT 3')", {
    timeout: 2000,
  });
  expect(productName.isVisible()).toBeTruthy();
  expect(productName).toHaveText("ZARA COAT 3");
  expect(productName,{hasText:"ZARA COAT 3"}).toBeTruthy();
  expect(page.getByText(product)).toBeVisible()
  await page.locator("text='Checkout'").click();
  await page.waitForTimeout(1000);
  const emailText = await page.locator(".user__name.mt-5 label").textContent();
  console.log(emailText);
  expect(emailText).toContain("mukuljain@gmail.com");
  await page.getByPlaceholder("Select Country").pressSequentially("ind");
  await page.waitForTimeout(1000);
  const countryNames = await page
    .locator("section.ta-results button")
    .allTextContents();

  console.log(countryNames);
  await page.getByRole("button", { name: "Indonesia" }).click();
  await page.screenshot({ path: "screenshot.png" });
  await page.locator(".action__submit").click();
  await expect(page.locator(".hero-primary")).toHaveText(
    " Thankyou for the order. "
  );
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
