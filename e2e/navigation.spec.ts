import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
});

test("navigation is visible", async ({ page }) => {
  await expect(page.getByTestId("navigation")).toBeVisible();
});

test("navigation is correct", async ({ page }) => {
  const navLinkCollection = page
    .getByTestId("navigation-links")
    .getByRole("listitem");

  await expect(navLinkCollection).toHaveCount(5);

  const navLinks = await navLinkCollection.all();

  await expect(navLinks[0]).toHaveText("about");
  await expect(navLinks[1]).toHaveText("skills");
  await expect(navLinks[2]).toHaveText("experience");
  await expect(navLinks[3]).toHaveText("projects");
  await expect(navLinks[4]).toHaveText("contact");
});

const anchors = ["about", "skills", "experience", "projects", "contact"];

const anchorTests = anchors.map((anchor: string) => {
  return new Promise((resolve: (value?: any) => void) => {
    test(`navigation link - ${anchor}`, async ({ page }) => {
      const navLink = page.locator("a", { hasText: anchor });

      await expect(navLink).toBeVisible();

      await navLink.click({ delay: 2000 });

      if ("about" === anchor) {
        await expect(
          page.locator("span", { hasText: "Kathryn Audrey" }),
        ).toBeVisible();
      } else {
        await expect(
          page.locator("css=summary", { hasText: new RegExp(anchor, "i") }),
        ).toBeVisible();
        await expect(
          page.locator(`css=#${anchor}-details`, {
            hasText: new RegExp(anchor, "i"),
          }),
        ).toHaveAttribute("open");
      }

      resolve();
    });
  });
});

anchorTests.reduce((prev: Promise<any>, next: Promise<any>) =>
  prev.then(() => next),
);
