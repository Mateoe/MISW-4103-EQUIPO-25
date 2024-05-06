class PostPage {
  constructor(page) {
    this.page = page;
  }

  async openPosts() {
    await this.page.waitForSelector('a[data-test-nav="posts"]');
    await this.page.click('a[data-test-nav="posts"]');
    await this.page.waitForSelector(
      "body > div.gh-app > div > main > section > section"
    );
  }

  async openNewPost() {
    await this.page.waitForSelector('[data-test-nav="new-story"]');

    await this.page.click('[data-test-nav="new-story"]');
  }

  async fillPostForm(title) {
    await this.page.type("[data-test-editor-title-input]", title, {
      delay: 200,
    });
  }

  async publishPost() {
    await new Promise((r) => setTimeout(r, 2000));
    await this.page.waitForSelector('button[data-test-button="publish-flow"]');
    await this.page.click('button[data-test-button="publish-flow"]');
  }

  async finalReview() {
    await new Promise((r) => setTimeout(r, 2000));
    await this.page.waitForSelector('button[data-test-button="continue"]');
    await this.page.click('button[data-test-button="continue"]');
  }

  async confirmPublish() {
    await new Promise((r) => setTimeout(r, 2000));
    await this.page.waitForSelector(
      'button[data-test-button="confirm-publish"]'
    );
    await this.page.click('button[data-test-button="confirm-publish"]');
  }

  async publishedPostSusccessfully() {
    await this.page.waitForSelector(
      'button[data-test-button="back-to-editor"]',
      {
        timeout: 30000,
      }
    );
  }

  async convertToPaid() {
    await this.page.click("button.settings-menu-toggle");
    await this.page.waitForSelector(
      'select[data-test-select="post-visibility"]'
    );
    await this.page.select(
      'select[data-test-select="post-visibility"]',
      "paid"
    );
  }

  async assignTags() {
    await this.page.click("button.settings-menu-toggle");
    await new Promise((r) => setTimeout(r, 1000));
    await this.page.type(
      ".ember-power-select-trigger-multiple-input",
      "tag-test-2"
    );
    await this.page.keyboard.press("Enter");
  }

  async returnToPosts() {
    await this.page.goBack();
    await this.page.waitForSelector('a[data-test-nav="posts"]');
  }
}

module.exports = PostPage;
