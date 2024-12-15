import { test, expect, request } from "@playwright/test";
const APIUtils  =require ("../../Utils/APIUtils.js");

let OrderResponse;
let token;
const fakePayLodeOrders = {
  data: [],
  message: "No Orders",
};
test.beforeAll(async () => {
  let apiContext = await request.newContext();
  let apiUtilsInstance = new APIUtils(apiContext);
  token = await apiUtilsInstance.getToken();
  OrderResponse = await apiUtilsInstance.createOrder();
});

test("API:Netwrok response intercept Test", async ({ page }) => {
  page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, token);

  await page.goto("https://rahulshettyacademy.com/client/");
  await page.locator("button[routerlink*='cart']").click();
  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/6710b5b8ae2afd4c0b9e25ae",
    async (route) => {
      //intercepting response -> API Response  -> fake-response -> browser -> render data on front end
      const response = await page.request.fetch(route.request());
      const responseBody = await response.body();
      const responseString = responseBody.toString("utf8");
      console.log("intercepted response:", responseString);
      let body = JSON.stringify(fakePayLodeOrders);
      await route.fulfill({
        response,
        body,
      });
    }
  );

  await page.locator("button[routerlink*='myorders']").click();
  page.on("response", async (response) => {
    if (
      response.url() ===
      "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/6710b5b8ae2afd4c0b9e25ae"
    ) {
      const responseBody = await response.body();
      const responseString = responseBody.toString("utf8");
      console.log("modified response:", responseString);
    }
  });

  expect(
    page.getByText(" You have No Orders to show at this time.")
  ).toContainText(" You have No Orders to show at this time.");

  console.log("Test executed successfully");
});
