class AdminPage {
  constructor(page, path, logStep, screenshotsDir, screenshots) {
    this.page = page;
    this.path = path;
    this.logStep = logStep;
    this.screenshotsDir = screenshotsDir;
    this.screenshots = screenshots;
  }

  async openTags() {
    await this.page.waitForSelector('a[href="#/tags/"]');
    await this.page.click('a[href="#/tags/"]');
    await this.page.waitForSelector(
      "section.view-actions"
    );
    await this.logStep(
      this.screenshots.text5,
      this.path.join(this.screenshotsDir, this.screenshots.image5)
    );
  }
  async openSettings() {
    await this.page.waitForSelector('a[data-test-nav="settings"]');
    await this.page.click('a[data-test-nav="settings"]');
    await this.page.waitForSelector(
      "#admin-x-settings-scroller > div > div:nth-child(1) > h2"
    );
  }

  async openMembers() {
    await this.page.waitForSelector('a[data-test-nav="members"]');
    await this.page.click('a[data-test-nav="members"]');
    await this.page.waitForSelector(
      "section.view-container.members-list-container-stretch"
    );
  }

  async closeSettings() {
    await new Promise((r) => setTimeout(r, 1000));
    await this.page.waitForSelector('button[data-testid="exit-settings"]');
    await this.page.click('button[data-testid="exit-settings"]');
  }

  async logOut(text, image) {
    await this.page.waitForSelector("div.gh-user-avatar");

    await new Promise((r) => setTimeout(r, 1000));
    await this.logStep(
      this.screenshots[text],
      this.path.join(this.screenshotsDir, this.screenshots[image])
    );
    await this.page.click("div.gh-user-avatar");
    await this.page.waitForSelector('a[href="#/signout/"]');
    await this.page.click('a[href="#/signout/"]');
    await this.page.waitForNavigation();
  }
}

module.exports = AdminPage;
