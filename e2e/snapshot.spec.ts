import { test, expect } from "@playwright/test";

test("index snapshot", async ({ page }) => {
  await page.goto("http://localhost:4321/");

  await expect(page).toMatchAriaSnapshot({ name: "index.aria.yml" });
});

test("skills snapshot", async ({ page }) => {
  await page.goto("http://localhost:4321/#skills");

  await expect(page).toMatchAriaSnapshot({ name: "skills.aria.yml" });
});

test("experience snapshot", async ({ page }) => {
  await page.goto("http://localhost:4321/#experience");

  await expect(page).toMatchAriaSnapshot({ name: "experience.aria.yml" });
});

test("projects snapshot", async ({ page }) => {
  await page.goto("http://localhost:4321/#projects");

  await expect(page).toMatchAriaSnapshot({ name: "projects.aria.yml" });
});

test("contact snapshot", async ({ page }) => {
  await page.goto("http://localhost:4321/#contact");

  await expect(page).toMatchAriaSnapshot({ name: "contact.aria.yml" });
});
