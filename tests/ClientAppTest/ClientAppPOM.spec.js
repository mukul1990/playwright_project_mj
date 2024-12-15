const { test, expect } = require("@playwright/test");
const{POManager}=require("../../pageObjects/POManager");
const { customTest } = require('../../UITestData/fixtures');
const dataset=JSON.parse(JSON.stringify(require("../../UITestData/placeOrderTestData.json")));

// let loginpage;

// test.beforeAll("Test setup",async ({browser})=>
// {
//   const context = await browser.newContext();
//   const page = await context.newPage();
//   const pomanager= new POManager(page)
//    loginpage=  pomanager.getLoginPage()
// })

// // test.afterAll(async () => {
// //   // Close the context after all tests are done
// //   await context.close();
// // });

test.describe.configure({ mode: 'serial' })
customTest('smoke:client app login failure Test using POM', async ({ page,testOrderData1 }) => {
   const loginpage= new POManager(page).getLoginPage()
  await loginpage.goTo();
  await loginpage.validLogin(testOrderData1.email,testOrderData1.password);
  const errorMsg = await loginpage.errorValidation();
  console.log(errorMsg);
  expect(errorMsg).toBe(" Incorrect email or password. ");
});

for(const data of dataset){
test(`smoke:client app login pass Test for ${data.product}`, async ({page}) => {
 const pomanager= new POManager(page)
   const loginpage=  pomanager.getLoginPage()
  await loginpage.goTo();
  await loginpage.validLogin(data.email,data.password);
  const pageTitle = await page.title()
  expect(pageTitle).toMatch(new RegExp(".*Shop*."));
});
}
test('smoke:client app product order Test', async ({ page }) => {
 
  const pomanager= new POManager(page);
  const loginpage= pomanager.getLoginPage()
  const dashboard= pomanager.getDashBoard();
  const myCart= pomanager.getMyCart();
  const placeOrder= pomanager.getPlaceOrder();
  const orderconfirm= pomanager.getOrderConfirmation();
  const orderHistory= pomanager.getOrderHistory();
  const orderSummary= pomanager.getOrderSummary();
  await loginpage.goTo();
  await loginpage.validLogin(dataset[0].email,dataset[0].password);
  await page.waitForTimeout(1000);
  await dashboard.addProductToCart(dataset[0].product);
  await dashboard.navigateToCartPage();

  //Product name validation in cart
  const bool=await myCart.productNameValidation(dataset[0].product);
  expect(bool).toBeTruthy();
  //expect(productName,{hasText:"ZARA COAT 3"}).toBeTruthy();
  //expect(page.getByText(product)).toBeVisible()
  //await page.locator("text='Checkout'").click();
  await myCart.navigateToCheckout();
  await page.waitForTimeout(1000);
  const emailText = await placeOrder.getEmailText();
  console.log(emailText);
  expect(emailText).toContain(dataset[0].email);
  await placeOrder.selectCountry(dataset[0].country);
  await placeOrder.ClickOnplaceOrder();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: "screenshot.png" });
  const orderMsg=await orderconfirm.getOrderConfirmation();
  console.log(orderMsg);
  expect(orderMsg).toContain(" Thankyou for the order. ");
  const orderid= await orderconfirm.getOrderId();
  const orderIdValue = orderid[0].replace(/[^a-zA-Z0-9]/g, "");
  await orderconfirm.navigateToOrderHistory();
  await page.waitForTimeout(2000);
  await orderHistory.goToOrderDetails(orderIdValue);

  const orderDetails=await orderSummary.getOrderDetails();
   expect(orderDetails.includes(orderIdValue)).toBeTruthy();
   console.log("Test executed successfully");
});
