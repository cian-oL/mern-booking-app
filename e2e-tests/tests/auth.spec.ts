import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173";

test("should allow user to sign in", async ({ page }) => {
  await page.goto(UI_URL);

  // get sign in button & assert correct heading (expect == assert)
  await page.getByRole("link", { name: "Sign In" }).click(); // name == string text
  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  // fill fields & click login
  await page.locator("[name=email]").fill("one@one.com");
  await page.locator("[name=password]").fill("password");
  await page.getByRole("button", { name: "Sign In" }).click();

  // check assertion for successful sign in by UI change
  await expect(page.getByText("You have signed in")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});

test("should be able to register sucessfully", async ({ page }) => {
  // generate random user email to avoid repeat registrations
  const testEmail = `test-register_${
    Math.floor(Math.random() * 50000) + 40000
  }@testmail.com`;

  // access the register page from the sign in page
  await page.goto(UI_URL);
  await page.getByRole("link", { name: "Sign In" }).click();
  await page.getByRole("link", { name: "Create an account here" }).click();
  await expect(
    page.getByRole("heading", { name: "Create an Account" })
  ).toBeVisible();

  // success on correct completion of form
  await page.locator("[name=firstName]").fill("Bilbo");
  await page.locator("[name=lastName]").fill("Baggins");
  await page.locator("[name=email]").fill(testEmail);
  await page.locator("[name=password]").fill("precious");
  await page.locator("[name=confirmPassword]").fill("precious");
  await page.getByRole("button", { name: "Create Account" }).click();

  // check assertion by appropriate UI change
  await expect(page.getByText("Registration Success")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});
