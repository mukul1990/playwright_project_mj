import { test, expect,Dialog  } from "@playwright/test";

test("demo:Page Navigation Test", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await page.goto("https://google.com");
  await page.goBack();
  await page.goForward();
});

test("demo:Page hidden elements validation Test", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  const displayedElement = page.locator("#displayed-text");
  const hiddenButton = page.locator("#hide-textbox");
  await expect(displayedElement).toBeVisible();
  await hiddenButton.click();
  await expect(displayedElement).toBeHidden();
  page.on("dialog", (dialog:Dialog ) => {
    dialog.accept();
  });
  await page.locator("#confirmbtn").click();
  await page.locator("#mousehover").hover();
  const topMenu = page.locator(".mouse-hover-content");
  const subMenu = topMenu.locator("a");
  await subMenu.first().click();
  await expect(page).toHaveURL(
    "https://rahulshettyacademy.com/AutomationPractice/#top"
  );
  const frames = page.locator("#courses-iframe");
  const bool = await frames
    .getByRole("link", { name: "All Access plan" })
    .isVisible();

  console.log(bool);
  expect(bool).toBeFalsy();
});
