const{test, expect} = require('@playwright/test');

test('Page Playwright Test', async ({ page }) => {
    await page.goto('https://google.com');
    await expect(page).toHaveTitle("Google");
})

test('Validate Login Test success', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await expect(page).toHaveTitle(new RegExp(".*LoginPage*."))
    await page.locator("#username").fill("rahulshettyacademy");
    await page.locator("#password").fill("learning");
    await page.locator("#signInBtn").click();
    await expect(page).toHaveTitle(new RegExp(".*Commerce*."))
    await context.close();
})

test('Validate Login Failure Test', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await expect(page).toHaveTitle(new RegExp(".*LoginPage*."))
    await page.locator("#username").fill("rahulshettyacademyyy");
    await page.locator("#password").fill("learning");
    await page.locator("#signInBtn").click();
    const errorText = await page.locator("[style*='block']").textContent();
    console.log(errorText);
    expect(errorText).toContain("Incorrect");
    await context.close();
})

test('Validate Page loading Test', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await expect(page).toHaveTitle(new RegExp(".*LoginPage*."))
    await page.locator("#username").fill("rahulshettyacademy");
    await page.locator("#password").fill("learning");
    await page.locator("#signInBtn").click();
    await page.waitForTimeout(5000);
    const productNameElements = await page.locator(".card-body a")
    const productNames = await productNameElements.allTextContents();
    if(productNames.length > 0){
        console.log(productNames);
    }
    
    console.log(productNames[0]);
    expect(productNames).toHaveLength>(0);
    expect(productNames).toContain("Samsung Note 8");
    await context.close();
})



test.only('Validate UI Control Test', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const userName= page.locator("#username")
    const password= page.locator("#password")
    const signInBtn= page.locator("#signInBtn")
    const dropDown=page.locator("select.form-control")

    await userName.fill("rahulshettyacademy");
    await password.fill("learning");
    await dropDown.selectOption("Teacher");
    const options = await dropDown.locator('option');
    const lastOptionText = await options.last().textContent();
   expect(lastOptionText).toBe("Consultant");
    
   // await page.pause()
    //Radio button Validation
   
    await page.locator("label.customradio").last().click()
    await page.locator("#okayBtn").click()
    const radioButtonTrutyh=await page.locator("span.radiotextsty").last().isChecked();
    expect(radioButtonTrutyh).toBeTruthy()

    //Label Element Validation

    await page.locator("#terms").click()
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
     expect(await page.locator("#terms").isChecked()).toBeFalsy()

     //Document Link blink Validation
     const documentLink=page.locator("[href*='documents-request']")
    await expect(documentLink).toHaveAttribute("class","blinkingText")

    //Document link opening another tab Validation
    const [newPage]=await Promise.all([
    context.waitForEvent('page'),
    documentLink.click()
    ])
    expect(await newPage.locator("p.im-para.red").first().textContent()).toContain(" mentor@rahulshettyacademy.com")
    await context.close();
})