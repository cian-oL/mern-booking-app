import { test, expect } from "@playwright/test";
import path from "path";

const UI_URL = "http://localhost:5173";

// confirm sign-in to view hotels page before running tests on hotel pages
test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);
  await page.getByRole("link", { name: "Sign In" }).click();
  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();
  await page.locator("[name=email]").fill("one@one.com");
  await page.locator("[name=password]").fill("password");
  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(page.getByText("You have signed in")).toBeVisible();
});

test("should allow user to add a hotel", async ({ page }) => {
  //   Details Section
  await page.goto(`${UI_URL}/add-hotel`);
  await page.locator("[name=hotelName]").fill("Test Hotel Name");
  await page.locator("[name=city]").fill("Test City");
  await page.locator("[name=country]").fill("Test Country");
  await page
    .locator("[name=description]")
    .fill("Test Description for this imaginary hotel");
  await page.locator("[name=pricePerNight]").fill("123");
  await page.selectOption("select[name=rating]", "3");

  //   Hotel Type Section
  await page.getByText("Luxury").click();

  //   Facilities Section -- confirm multiple selection is possible
  await page.getByLabel("Free WiFi").check();
  await page.getByLabel("Spa").check();

  //   Guest Number Section
  await page.locator("[name=adultCount]").fill("74");
  await page.locator("[name=childCount]").fill("75");

  //   Images Section
  await page.setInputFiles("[name=imageFiles]", [
    path.join(__dirname, "files", "test-image_1.webp"),
    path.join(__dirname, "files", "test-image_2.webp"),
  ]);

  await page.getByRole("button", { name: "Add" }).click();
  await expect(page.getByText("Hotel Saved")).toBeVisible();
});

test("should display hotels", async ({ page }) => {
  await page.goto(`${UI_URL}/my-hotels`);

  // Hotel details are visible
  await expect(page.getByText("Test Hotel Name")).toBeVisible();
  await expect(
    page.getByText("Test Description for this imaginary hotel")
  ).toBeVisible();
  await expect(page.getByText("Test City")).toBeVisible();
  await expect(page.getByText("Test Country")).toBeVisible();
  await expect(page.getByText("Luxury")).toBeVisible();
  await expect(page.getByText("€123 Per Night")).toBeVisible();
  await expect(page.getByText("74 Adults")).toBeVisible();
  await expect(page.getByText("75 Children")).toBeVisible();
  await expect(page.getByText("3 Star Rating")).toBeVisible();

  // Button links are visible
  await expect(page.getByRole("link", { name: "Add Hotel" })).toBeVisible();
  await expect(page.getByRole("link", { name: "View Details" })).toBeVisible();
});
