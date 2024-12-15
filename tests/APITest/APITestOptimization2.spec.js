import { test, expect, request } from "@playwright/test";
const APIUtils  =require ("../../Utils/APIUtils.js");


let OrderResponse;
test.beforeAll(async () => {
  let apiContext = await request.newContext();
  let apiUtilsInstance = new APIUtils(apiContext);
  OrderResponse = await apiUtilsInstance.createOrder();
});

test('API:place the order Test', async ({ page }) => {
//   page.addInitScript((value) => {
//     window.localStorage.setItem("token", value);
//   }, token);

  
  console.log(OrderResponse);
  expect(OrderResponse.status).toBe(201);
  expect(OrderResponse.data.message).toBe("Order Placed Successfully");
});
