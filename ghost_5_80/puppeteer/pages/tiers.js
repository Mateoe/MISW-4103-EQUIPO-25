class TierPage {
  constructor(page) {
    this.page = page;
  }

  async openNewTier() {
    await this.page.waitForSelector(
      "#admin-x-settings-scroller > div > div:nth-child(3) > div > div:nth-child(3) > section > div.block.undefined > div > div > button"
    );
    await this.page.click(
      "#admin-x-settings-scroller > div > div:nth-child(3) > div > div:nth-child(3) > section > div.block.undefined > div > div > button"
    );
  }

  async newTier(
    subscriptionCompleteType,
    description,
    priceMonth,
    priceAnual,
    benefit
  ) {
    await this.page.waitForSelector("#modal-backdrop > section > div.p-7.py-0");

    await this.page.type(
      'input[type="text"][placeholder="Bronze"]',
      subscriptionCompleteType,
      {
        delay: 100,
      }
    );

    await this.page.type(
      'input[type="text"][placeholder="Full access to premium content"]',
      description,
      { delay: 100 }
    );
    await this.page.type('input[type="text"][placeholder="5"]', priceMonth, {
      delay: 100,
    });
    await this.page.type('input[type="text"][placeholder="50"]', priceAnual, {
      delay: 100,
    });

    await this.page.type(
      'input[type="text"][placeholder="Expert analysis"]',
      benefit,
      { delay: 100 }
    );

    await this.page.click("button.cursor-pointer.bg-green");
  }

  async saveTier() {
    await new Promise((r) => setTimeout(r, 1000));

    await this.page.click(
        "#modal-backdrop > section > div.w-100.sticky.bottom-\\[-24px\\].z-\\[297\\].m-0.box-border.p-0 > div.sticky.z-\\[299\\].mb-\\[-24px\\].flex.items-center.justify-between.h-\\[96px\\].bg-white.dark\\:bg-black > div > div.flex.gap-3 > div > button.cursor-pointer.bg-black.text-white.dark\\:bg-white.dark\\:text-black.hover\\:bg-grey-900.inline-flex.items-center.justify-center.whitespace-nowrap.rounded.text-sm.transition.font-bold.h-\\[34px\\].px-4.min-w-\\[80px\\]"
      );
  }
}

module.exports = TierPage;
