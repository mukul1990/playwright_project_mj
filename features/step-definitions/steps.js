const { When, Then, Given, And } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
Given(
  "Login to Ecommerce application with {string} and {string}",
  { timeout: 100 * 1000 },
  async function (username, password) {
    const loginpage = this.pomanager.getLoginPage();
    await loginpage.goTo();
    await loginpage.validLogin(username, password);
  }
);

When("Add {string} to cart", async function (product) {
  // Write code here that turns the phrase above into concrete actions
  const dashboard = this.pomanager.getDashBoard();
  await dashboard.addProductToCart(product);
  await dashboard.navigateToCartPage();
  await dashboard.navigateToCartPage();
});

Then("Verify {string} is displayed in the cart", async function (product) {
  // Write code here that turns the phrase above into concrete actions
  const myCart = this.pomanager.getMyCart();
  const bool = await myCart.productNameValidation(product);
  expect(bool).toBeTruthy();
  await myCart.navigateToCheckout();
  await this.page.waitForTimeout(1000);
});

When("validate details {string}", async function (email) {
  // Write code here that turns the phrase above into concrete actions
  this.placeOrder = this.pomanager.getPlaceOrder();
  const emailText = await this.placeOrder.getEmailText();
  console.log(emailText);
  expect(emailText).toContain(email);
});

When("Select country {string} and place the order", async function (country) {
  await this.placeOrder.selectCountry(country);
  await this.placeOrder.ClickOnplaceOrder();
  await this.page.waitForTimeout(1000);
});

When("Verify Order Confirmation", async function () {
  const orderconfirm = this.pomanager.getOrderConfirmation();
  const orderMsg = await orderconfirm.getOrderConfirmation();
  console.log(orderMsg);
  expect(orderMsg).toContain(" Thankyou for the order. ");
  const orderid = await orderconfirm.getOrderId();
  this.orderIdValue = orderid[0].replace(/[^a-zA-Z0-9]/g, "");
  await orderconfirm.navigateToOrderHistory();
  await this.page.waitForTimeout(2000);
});

Then("Verify order in present in the orderHistory", async function () {
  // Write code here that turns the phrase above into concrete actions
  const orderHistory = this.pomanager.getOrderHistory();
  const orderSummary = this.pomanager.getOrderSummary();
  await orderHistory.goToOrderDetails(this.orderIdValue);
  const orderDetails = await orderSummary.getOrderDetails();
  expect(orderDetails.includes(this.orderIdValue)).toBeTruthy();
});

Given(
  "Login to Ecommerce2 application with {string} and {string}",
  async function (username, password) {
    // Write code here that turns the phrase above into concrete actions
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await expect(this.page).toHaveTitle(new RegExp(".*LoginPage*."));
    await this.page.locator("#username").fill(username);
    await this.page.locator("#password").fill(password);
    await this.page.locator("#signInBtn").click();
  }
);

Then("Verify Error message is displayed", async function () {
  // Write code here that turns the phrase above into concrete actions
  const errorText = await this.page.locator("[style*='block']").textContent();
  console.log(errorText);
  expect(errorText).toContain("Incorrect");
});
