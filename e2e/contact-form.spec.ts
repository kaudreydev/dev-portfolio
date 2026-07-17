import { expect, test, type Locator, type Page } from "@playwright/test";

const altchaTimeout = 30000;

function getContactFormElements(page: Page): Locator[] {
  return [
    page.getByLabel("Your Name"),
    page.getByLabel("Your E-mail"),
    page.getByLabel("Subject (optional)"),
    page.getByLabel("Message"),
    page.getByLabel("I'm not a robot"),
    page.locator("button", { hasText: "Send" }),
  ];
}

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.locator("a", { hasText: "contact" }).click({ delay: 2000 });
});

test("contact form appears correctly", async ({ page }) => {
  const [
    fieldName,
    fieldEmail,
    fieldSubject,
    fieldMessage,
    altcha,
    buttonSubmit,
  ] = getContactFormElements(page);

  // Description
  await expect(page.getByTestId("contact-form-unsent")).toHaveText(
    "Feel free to send me a message using the contact form below and I'll get back to you as soon as possible!",
  );

  // Name (required)
  await expect(fieldName).toBeVisible();
  await expect(fieldName).toHaveAttribute("placeholder", "Joseph Sisko");
  await expect(fieldName).not.toBeDisabled();

  // E-mail (required)
  await expect(fieldEmail).toBeVisible();
  await expect(fieldEmail).toHaveAttribute(
    "placeholder",
    "joseph.sisko@example.com",
  );
  await expect(fieldEmail).not.toBeDisabled();

  // Subject (optional)
  await expect(fieldSubject).toBeVisible();
  await expect(fieldSubject).toHaveAttribute(
    "placeholder",
    "Web Work Opportunity",
  );
  await expect(fieldSubject).not.toBeDisabled();

  // Message (required)
  await expect(fieldMessage).toBeVisible();
  await expect(fieldMessage).toHaveAttribute("placeholder", "Let's connect!");
  await expect(fieldMessage).not.toBeDisabled();

  // Altcha
  await expect(altcha).toBeVisible();
  await expect(altcha).not.toBeDisabled();
  await expect(altcha).not.toBeChecked();

  // Submit button
  await expect(buttonSubmit).toBeVisible();
  await expect(buttonSubmit).not.toBeDisabled();
});

test("contact form validation", async ({ page }) => {
  const [fieldName, fieldEmail, fieldSubject, fieldMessage] =
    getContactFormElements(page);

  // Name (required)
  await expect(fieldName).toHaveAttribute("required");
  await expect(fieldEmail).toHaveAttribute("required");
  await expect(fieldSubject).not.toHaveAttribute("required");
  await expect(fieldMessage).toHaveAttribute("required");

  // Check max length config
  await expect(fieldName).toHaveAttribute("maxlength", "100");
  await expect(fieldEmail).toHaveAttribute("maxlength", "150");
  await expect(fieldSubject).toHaveAttribute("maxlength", "150");
  await expect(fieldMessage).toHaveAttribute("maxlength", "500");

  // Check type config
  await expect(fieldEmail).toHaveAttribute("type", "email");
});

test("contact form altcha behaves as expected", async ({ page }) => {
  test.slow();

  // Click unverified altcha
  await page.getByLabel("I'm not a robot").click();

  // Ensure altcha was successful
  await expect(page.getByLabel("Verified")).toBeChecked({
    timeout: altchaTimeout,
  });
});

test("contact form e-mail sending", async ({ page }) => {
  test.slow();

  const [
    fieldName,
    fieldEmail,
    fieldSubject,
    fieldMessage,
    altcha,
    buttonSubmit,
  ] = getContactFormElements(page);

  // Mock the api call
  await page.route("*/**/api/send", async (route) => {
    console.log("Mock Route Activated - Request: ", route.request().postData());
    const body = JSON.stringify({ data: [{ id: "test" }, { id: "test" }] });
    await route.fulfill({ body, contentType: "application/json", status: 200 });
  });

  await fieldName.fill("Joseph Sisko");
  await fieldEmail.fill("joseph.sisko@example.com");
  await fieldSubject.fill("Web Work Opportunity");
  await fieldMessage.fill("Let's connect!");

  await altcha.click({ timeout: altchaTimeout });
  await buttonSubmit.click({ delay: altchaTimeout });

  await expect(page.getByTestId("contact-form-success")).toHaveText(
    "Thank you! Your message has been sent.",
  );
});
