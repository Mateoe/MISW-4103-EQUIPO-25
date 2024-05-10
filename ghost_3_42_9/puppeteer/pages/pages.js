class PagePage {
  constructor(page, path, logStep, screenshotsDir, screenshots) {
    this.page = page;
    this.path = path;
    this.logStep = logStep;
    this.screenshotsDir = screenshotsDir;
    this.screenshots = screenshots;
  }

  async openPages(text, image) {
    await this.page.waitForSelector('a[href="#/pages/"]');
    await this.page.click('a[href="#/pages/"]');
    await this.page.waitForSelector('a[title="Edit this page"]');
    await this.logStep(
      this.screenshots[text],
      this.path.join(this.screenshotsDir, this.screenshots[image])
    );
  }

  async openNewPage() {
    await this.page.waitForSelector('a[href="#/editor/page/"]');
    await this.page.click('a[href="#/editor/page/"]');
    await this.logStep(
      this.screenshots.text6,
      this.path.join(this.screenshotsDir, this.screenshots.image6)
    );
  }

  async openEditPage(pageName) {
    await this.page.waitForSelector('h3.gh-content-entry-title')
    await this.page.evaluate((pageName) => {
      const elements = document.querySelectorAll('h3.gh-content-entry-title');
      for (let i = 0; i < elements.length; i++) {
        if (elements[i].textContent.trim() === pageName) {
          elements[i].click();
          return;
        }
      }
      return;
    }, pageName);
    await this.logStep(
      this.screenshots.text6,
      this.path.join(this.screenshotsDir, this.screenshots.image6)
    );
  }

  async deletePage() {
    await this.page.waitForSelector('button[title="Settings"]');
    await this.page.click('button[title="Settings"]');
    await this.logStep(
      this.screenshots.text7,
      this.path.join(this.screenshotsDir, this.screenshots.image7)
    );
    await this.page.waitForSelector('.gh-btn.settings-menu-delete-button');
    await this.page.click('.gh-btn.settings-menu-delete-button');
    await this.logStep(
      this.screenshots.text8,
      this.path.join(this.screenshotsDir, this.screenshots.image8)
    );
    await this.page.evaluate(() => {
      const modal = document.querySelector('.modal-content');
      if (modal) {
        const deleteButton = modal.querySelector('.gh-btn-red');
        if (deleteButton) {
          deleteButton.click();
        }
      }
    });
    await this.logStep(
      this.screenshots.text9,
      this.path.join(this.screenshotsDir, this.screenshots.image9)
    );
  }

  async fillPageForm(title) {
    await this.page.type("textarea.gh-editor-title", title, {
      delay: 200,
    });

    await this.logStep(
      this.screenshots.text7,
      this.path.join(this.screenshotsDir, this.screenshots.image7)
    );
    await this.page.keyboard.press("Enter");

    await new Promise((r) => setTimeout(r, 2000));
  }

  async assignTags(text, image) {
    await new Promise((r) => setTimeout(r, 1000));

    await this.page.click("button.page-settings");

    await this.page.type(
      ".ember-power-select-trigger-multiple-input",
      "tag-test-2"
    );
    await new Promise((r) => setTimeout(r, 1000));

    await this.page.keyboard.press("Enter");

    await this.logStep(
      this.screenshots[text],
      this.path.join(this.screenshotsDir, this.screenshots[image])
    );
    await new Promise((r) => setTimeout(r, 1000));

    await this.page.click("button.close.settings-menu-header-action");
  }

  async publishPage(text, image) {
    await new Promise((r) => setTimeout(r, 1000));

    await this.page.waitForSelector("div.gh-publishmenu-trigger");

    await this.page.click("div.gh-publishmenu-trigger");
    await this.logStep(
      this.screenshots[text],
      this.path.join(this.screenshotsDir, this.screenshots[image])
    );
  }

  async confirmPublish(text, image) {
    await new Promise((r) => setTimeout(r, 2000));
    await this.page.waitForSelector("button.gh-btn-blue");
    await this.page.click("button.gh-btn-blue");

    await this.logStep(
      this.screenshots[text],
      this.path.join(this.screenshotsDir, this.screenshots[image])
    );
    await new Promise((r) => setTimeout(r, 1000));
    await this.page.click("button.gh-notification-close");
  }

  async returnToPages(text, image) {
    await this.page.goBack();
    await this.page.waitForSelector('a[href="#/pages/"]');

    await this.logStep(
      this.screenshots[text],
      this.path.join(this.screenshotsDir, this.screenshots[image])
    );
  }
}

module.exports = PagePage;
