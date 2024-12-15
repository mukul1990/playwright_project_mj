const{test, expect} = require('@playwright/test');

test('Page Calender Validation Test', async ({ page }) => {
    
    const date={
        day:"17",
        month:"May",
        year:"2024"
    }
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');
    await page.getByPlaceholder("----").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(date.year).click();
    await page.getByText(date.month).click();
    await page.getByText(date.day).click();
    await page.screenshot({ path: "screenshot.png" });
    // const month = await page.locator(".react-datepicker__month-select").innerText();
    // const year = await page.locator(".react-datepicker__year-select").innerText();
    // //console.log(month);
    // //console.log(year);
    // await page.locator(".react-datepicker__month-select").selectOption({label:month});
    // await page.locator(".react-datepicker__year-select").selectOption({label:year});
    // await page.locator(".react-datepicker__day--017").click();
})