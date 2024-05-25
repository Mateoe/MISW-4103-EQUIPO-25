class PostPage {
  constructor(page, path, logStep, screenshotsDir, screenshots) {
    this.page = page;
    this.path = path;
    this.logStep = logStep;
    this.screenshotsDir = screenshotsDir;
    this.screenshots = screenshots;
  }

  async openPosts() {
    await new Promise((r) => setTimeout(r, 1000));
    await this.page.click('a[data-test-nav="posts"]');
    await this.page.waitForSelector(
      "body > div.gh-app > div > main > section > section"
    );
  }

  async openNewPost() {
    await this.page.waitForSelector('a[href="#/editor/post/"]');
    await this.page.click('a[href="#/editor/post/"]');
    await this.logStep(
      this.screenshots.text1,
      this.path.join(this.screenshotsDir, this.screenshots.image1)
    );
  }

  async fillPostForm(title) {
    await this.page.type("[data-test-editor-title-input]", title, {
      delay: 200,
    });

    await this.logStep(
      this.screenshots.text2,
      this.path.join(this.screenshotsDir, this.screenshots.image2)
    );
  }

  async publishPost(text, image) {
    await this.page.keyboard.press("Enter");
    await new Promise((r) => setTimeout(r, 1000));

    await this.page.waitForSelector('button[data-test-button="publish-flow"]');

    await this.page.click('button[data-test-button="publish-flow"]');
    await this.logStep(
      this.screenshots[text],
      this.path.join(this.screenshotsDir, this.screenshots[image])
    );
  }

  async finalReview() {
    await new Promise((r) => setTimeout(r, 2000));
    await this.page.waitForSelector('button[data-test-button="continue"]');
    await this.page.click('button[data-test-button="continue"]');
  }

  async confirmPublish(text, image) {
    await new Promise((r) => setTimeout(r, 2000));
    await this.page.waitForSelector(
      'button[data-test-button="confirm-publish"]'
    );
    await this.page.click('button[data-test-button="confirm-publish"]');

    await this.logStep(
      this.screenshots[text],
      this.path.join(this.screenshotsDir, this.screenshots[image])
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

  async assignTags(text, image) {
    await this.page.click("button.settings-menu-toggle");
    await new Promise((r) => setTimeout(r, 1000));
    await this.page.type(
      ".ember-power-select-trigger-multiple-input",
      "tag-test-2"
    );
    await this.page.keyboard.press("Enter");

    await this.logStep(
      this.screenshots[text],
      this.path.join(this.screenshotsDir, this.screenshots[image])
    );
  }

  async returnToPosts() {
    await this.page.goBack();
    await this.page.waitForSelector('a[data-test-nav="posts"]');
  }
}

module.exports = PostPage;
