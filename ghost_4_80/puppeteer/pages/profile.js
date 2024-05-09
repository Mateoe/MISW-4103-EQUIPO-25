class ProfilePage {
  constructor(page, path, logStep, screenshotsDir, screenshots) {
    this.page = page;
    this.path = path;
    this.logStep = logStep;
    this.screenshotsDir = screenshotsDir;
    this.screenshots = screenshots;
  }

  async openProfileFromMain() {
    await this.page.waitForSelector("div.gh-user-avatar");
    await this.page.click("div.gh-user-avatar");

    await this.page.waitForSelector('a[href="#/settings/staff/equipo/"]');

    await new Promise((r) => setTimeout(r, 1000));
    this.logStep(
      this.screenshots.text5,
      this.path.join(this.screenshotsDir, this.screenshots.image5)
    );

    await this.page.click('a[href="#/settings/staff/equipo/"]');
  }

  async openProfileFromSetting() {
    await new Promise((r) => setTimeout(r, 1000));
    await this.page.waitForSelector("button.ml-2.inline-block");
    await this.page.click("button.ml-2.inline-block");
  }

  async fillProfileLocation(location) {
    await this.page.waitForSelector(
      "h1.break-words.md\\:break-normal.text-white.md\\:text-4xl.leading-tighter"
    );

    this.logStep(
      this.screenshots.text6,
      this.path.join(this.screenshotsDir, this.screenshots.image6)
    );

    const idValue = await this.page.evaluate(() => {
      const labelElements = document.querySelectorAll("label");
      let idValue = "";
      labelElements.forEach((label) => {
        if (label.innerText.trim() === "Location") {
          idValue = label.getAttribute("for");
        }
      });
      return idValue;
    });

    let selectorName = 'input[id="' + idValue + '"]';

    await this.page.click(selectorName, { clickCount: 3 });

    await new Promise((r) => setTimeout(r, 1000));

    await this.page.type(selectorName, location, { delay: 100 });

    return idValue;
  }

  async fillPorfileName(name) {
    await this.page.waitForSelector(
      "h1.break-words.md\\:break-normal.text-white.md\\:text-4xl.leading-tighter"
    );

    await new Promise((r) => setTimeout(r, 1000));
    this.logStep(
      this.screenshots.text6,
      this.path.join(this.screenshotsDir, this.screenshots.image6)
    );

    const idValue = await this.page.evaluate(() => {
      const labelElements = document.querySelectorAll("label");
      let idValue = "";
      labelElements.forEach((label) => {
        if (label.innerText.trim() === "Full name") {
          idValue = label.getAttribute("for");
        }
      });
      return idValue;
    });

    let selectorName = 'input[id="' + idValue + '"]';

    await this.page.click(selectorName, { clickCount: 3 });

    await new Promise((r) => setTimeout(r, 1000));

    await this.page.type(selectorName, name, { delay: 100 });
  }

  async saveProfile() {
    await this.page.click("button.cursor-pointer.bg-black");

    await new Promise((r) => setTimeout(r, 1000));
    this.logStep(
      this.screenshots.text8,
      this.path.join(this.screenshotsDir, this.screenshots.image8)
    );
  }
}
module.exports = ProfilePage;
