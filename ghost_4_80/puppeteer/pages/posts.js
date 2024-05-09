class PostPage {
  constructor(page, path, logStep, screenshotsDir, screenshots) {
    this.page = page;
    this.path = path;
    this.logStep = logStep;
    this.screenshotsDir = screenshotsDir;
    this.screenshots = screenshots;
  }

  async openPosts() {
    await this.page.waitForSelector('a[data-test-nav="posts"]');
    await this.page.click('a[data-test-nav="posts"]');
    await this.page.waitForSelector(
      "body > div.gh-app > div > main > section > section"
    );
    await this.logStep(
      this.screenshots.text10,
      this.path.join(this.screenshotsDir, this.screenshots.image10)
    );
  }

  async openNewPost() {
    await this.page.waitForSelector('a[href="#/editor/post/"]');
    await this.page.click('a[href="#/editor/post/"]');
    await this.logStep(
      this.screenshots.text5,
      this.path.join(this.screenshotsDir, this.screenshots.image5)
    );
  }

  async fillPostForm(title) {
    await this.page.type("[data-test-editor-title-input]", title, {
      delay: 200,
    });

    await this.logStep(
      this.screenshots.text6,
      this.path.join(this.screenshotsDir, this.screenshots.image6)
    );
  }

  async publishPost() {
    await this.page.keyboard.press("Enter");
    await new Promise((r) => setTimeout(r, 1000));

    await this.page.waitForSelector('button[data-test-button="publish-flow"]');

    await this.page.click('button[data-test-button="publish-flow"]');
    await this.logStep(
      this.screenshots.text7,
      this.path.join(this.screenshotsDir, this.screenshots.image7)
    );
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

    await this.logStep(
      this.screenshots.text8,
      this.path.join(this.screenshotsDir, this.screenshots.image8)
    );
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
    await this.logStep(
      this.screenshots.text9,
      this.path.join(this.screenshotsDir, this.screenshots.image9)
    );
  }
}

module.exports = PostPage;
