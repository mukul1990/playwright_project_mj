const {After,Before,AfterStep, Status} = require('@cucumber/cucumber')
const { POManager } = require("../../pageObjects/POManager");
const playwright  = require("@playwright/test");

Before(async function() {
    const browser = await playwright.chromium.launch({
        headless: false
    });
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.pomanager = new POManager(this.page);
});

AfterStep(async function({result}) {
    if(result.status === Status.FAILED) {
        await this.page.screenshot({path: 'screenshot.png', fullPage: true});
    }
})

After(async function() {
    await this.page.close();
    console.log("Test has executed successfully");
})