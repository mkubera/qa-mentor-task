import { test, expect } from "@playwright/test";
import { logger } from "../utils/logger";
// PAGE OBJECT MODEL (POM) PATTERN
import { CreatePage } from "./create.page";
import { SignInPage } from "./../auth/signin.page";
// TEST DATA MANAGEMENT PATTERN
import data from "./create.data.json";
import signinData from "./../auth/signin.data.json";

test.describe("Sign in and Create Article", () => {
  // HOOK PATTERN
  test.beforeEach(async ({ page }) => {
    // LOGGING
    // logger(page);

    // SIGN IN
    await page.goto(signinData.url);
    const signinPage = new SignInPage(page);
    await signinPage.signIn(signinData.email, signinData.password);

    // wait for redirect to home
    await page.waitForURL("https://conduit.mate.academy/");

    // LOAD PAGE
    await page.goto(data.url);
  });

  test("should create an article when all data is present", async ({
    page,
  }) => {
    const createPage = new CreatePage(page);
    await createPage.create(data.title, data.description, data.body, "");

    await expect(page.locator("div.banner h1")).toHaveText(data.title);
    await expect(page.locator("div.article-content p")).toHaveText(data.body);
    await expect(page.locator("ul.tag-list")).toHaveText(data.tags);
  });

  test("should not allow empty Title", async ({ page }) => {
    const createPage = new CreatePage(page);
    await createPage.create("", "", "", "");

    await expect(page.getByText("Article title cannot be empty")).toBeVisible();
  });

  test("should not allow empty Description", async ({ page }) => {
    const createPage = new CreatePage(page);
    await createPage.create(data.title, "", "", "");

    await expect(
      page.getByText("Article description cannot be empty")
    ).toBeVisible();
  });

  test("should not allow empty Body", async ({ page }) => {
    const createPage = new CreatePage(page);
    await createPage.create(data.title, data.description, "", "");

    await expect(page.getByText("Article body cannot be empty")).toBeVisible();
  });
});

test.describe("Create Article as a guest", () => {
  // HOOK PATTERN
  test.beforeEach(async ({ page }) => {
    // LOAD PAGE
    await page.goto(data.url);
  });

  test("should fail to create an article when all data is present", async ({
    page,
  }) => {
    const createPage = new CreatePage(page);
    await createPage.create(data.title, data.description, data.body, "");

    await expect(page.locator('button[type="button"]')).toBeDisabled();
  });
});
