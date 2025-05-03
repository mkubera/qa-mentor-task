import { test, expect } from "@playwright/test";
// PAGE OBJECT MODEL (POM) PATTERN
import { SignInPage } from "./signin.page";
// TEST DATA MANAGEMENT PATTERN
import data from "./signin.data.json";

test.describe("Signin", () => {
  // HOOK PATTERN
  test.beforeEach(async ({ page }) => {
    await page.goto(data.url);
  });

  test("should sign in when credentials are correct", async ({ page }) => {
    const signinPage = new SignInPage(page);
    await signinPage.signIn(data.email, data.password);

    await expect(page.getByText("Your Feed")).toBeVisible();
  });

  test("should not sign in when credentials are wrong", async ({ page }) => {
    const signinPage = new SignInPage(page);
    await signinPage.signIn("wrong@email.err", "wrong-password");

    await expect(page.getByText("is invalid")).toBeVisible();
  });

  test("should not sign in when fields are empty", async ({ page }) => {
    const signinPage = new SignInPage(page);
    await signinPage.signIn("", "");

    await expect(page.getByText("can't be blank")).toBeVisible();
  });
});
