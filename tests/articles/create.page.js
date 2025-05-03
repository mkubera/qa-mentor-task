export class CreatePage {
  constructor(page) {
    this.page = page;
    this.titleInput = page.locator('input[placeholder="Article Title"]');
    this.descriptionInput = page.locator(
      `input[placeholder="What's this article about?"]`
    );
    this.bodyTextarea = page.locator(`textarea`);
    this.tagsInput = page.locator(`input[placeholder="Enter tags"]`);
    this.submitButton = page.locator('button[type="button"]');
  }

  async create(title, description, body, tags) {
    await this.titleInput.fill(title);
    await this.descriptionInput.fill(description);
    await this.bodyTextarea.fill(body);
    await this.submitButton.click();
    await this.page.waitForLoadState();
  }
}
