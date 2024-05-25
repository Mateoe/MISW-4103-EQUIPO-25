class TierPage {
  constructor(page, path, logStep, screenshotsDir, screenshots) {
    this.page = page;
    this.path = path;
    this.logStep = logStep;
    this.screenshotsDir = screenshotsDir;
    this.screenshots = screenshots;
  }

  async openNewTier() {
    await this.page.waitForSelector(
      "#admin-x-settings-scroller > div > div:nth-child(3) > div > div:nth-child(3) > section > div.block.undefined > div > div > button"
    );
    await this.page.click(
      "#admin-x-settings-scroller > div > div:nth-child(3) > div > div:nth-child(3) > section > div.block.undefined > div > div > button"
    );

    await new Promise((r) => setTimeout(r, 1000));

    await this.logStep(
      this.screenshots.text1,
      this.path.join(this.screenshotsDir, this.screenshots.image1)
    );
  }

  async newTier(subscriptionCompleteType, priceMonth, priceAnual) {
    await this.page.waitForSelector("#modal-backdrop > section > div.p-7.py-0");

    await this.page.type(
      'input[type="text"][placeholder="Bronze"]',
      subscriptionCompleteType,
      {
        delay: 100,
      }
    );

    await this.page.type(
      'input[type="text"][placeholder="5"]',
      String(priceMonth),
      {
        delay: 100,
      }
    );

    await this.page.type(
      'input[type="text"][placeholder="50"]',
      String(priceAnual),
      {
        delay: 100,
      }
    );

    await this.logStep(
      this.screenshots.text2,
      this.path.join(this.screenshotsDir, this.screenshots.image2)
    );
  }

  async saveTier() {
    await new Promise((r) => setTimeout(r, 1000));

    await this.page.click(
      "#modal-backdrop > section > div.w-100.sticky.bottom-\\[-24px\\].z-\\[297\\].m-0.box-border.p-0 > div.sticky.z-\\[299\\].mb-\\[-24px\\].flex.items-center.justify-between.h-\\[96px\\].bg-white.dark\\:bg-black > div > div.flex.gap-3 > div > button.cursor-pointer.bg-black.text-white.dark\\:bg-white.dark\\:text-black.hover\\:bg-grey-900.inline-flex.items-center.justify-center.whitespace-nowrap.rounded.text-sm.transition.font-bold.h-\\[34px\\].px-4.min-w-\\[80px\\]"
    );
    await this.logStep(
      this.screenshots.text3,
      this.path.join(this.screenshotsDir, this.screenshots.image3)
    );
  }
}

module.exports = TierPage;
