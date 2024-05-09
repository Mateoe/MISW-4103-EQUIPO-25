class ProfilePage {
  constructor(page) {
    this.page = page;
  }

  async openProfileFromMain() {
    await this.page.waitForSelector("div.gh-user-avatar");
    await this.page.click("div.gh-user-avatar");

    await this.page.waitForSelector('a[href="#/settings/staff/equipo/"]');
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
  }
}
module.exports = ProfilePage;
