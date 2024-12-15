const{test, expect} = require('@playwright/test');

test('Page Playwright Test', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/angularpractice/');
   await page.getByLabel('Check me out if you Love IceCreams!').click();
   await page.getByLabel('Student').click();
   await page.getByLabel('Gender').selectOption('Female');
  // await page.getByLabel('Date of Birth').fill('17/05/2024');
//   await page.getByLabel('Date of Birth').click();
//   await page.getByLabel('Date of Birth').press('Control+a');
//   await page.getByLabel('Date of Birth').press('Backspace');
//   await page.getByLabel('Date of Birth').fill('17/05/2024');
//   await page.getByLabel('Date of Birth').press('Enter');
  //await page.getByRole('input', { name: 'name' }).first().fill("Rahul") 
  await page.getByPlaceholder("Password").fill("12345");
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.waitForTimeout(2000);
//   const text="Success! The Form has been submitted successfully!"
//   expect(text).toEqual("Success! The Form has been submitted successfully!")
    await page.getByText(" The Form has been submitted successfully!.").isVisible();
    await page.getByRole("link",{name:"Shop"}).click();
    await page.locator("app-card").filter({hasText:"Samsung Note 8"}).getByRole("button").click();
})