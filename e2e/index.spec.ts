import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("meta is correct", async ({ page }) => {
  await expect(page).toHaveTitle("KAudreyDev");
});

test("switches to dark mode and back to light", async ({ page }) => {
  await page.locator("[aria-label='dark mode']").click();

  await expect(page.locator("html")).toHaveAttribute("class", "dark");

  await page.locator("[aria-label='light mode']").click();

  await expect(page.locator("html")).toHaveAttribute("class", "light");
});
