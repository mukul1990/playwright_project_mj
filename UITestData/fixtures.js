const { test } = require("@playwright/test");

const testOrderData1 = {
  product: "ZARA COAT 3",
  email: "mukuljain1@gmail.com",
  password: "Automation@1233",
  country: "Indonesia",
};

const testOrderData2 = {
  product: "ZARA COAT 3",
  email: "mukuljain1@gmail.com",
  password: "Automation@1233",
  country: "Indonesia",
};

// Extend the test object to include your custom fixtures
const customTest = test.extend({
  testOrderData1: async ({}, use) => {
    await use(testOrderData1);
  },
  testOrderData2: async ({}, use) => {
    await use(testOrderData2);
  }
});

module.exports = {
  customTest,
};