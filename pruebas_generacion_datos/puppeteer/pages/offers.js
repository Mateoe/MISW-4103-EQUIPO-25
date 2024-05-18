class OfferPage {
  constructor(page) {
    this.page = page;
  }

  async openNewOffer() {

    await this.openOffers();

    await this.page.waitForSelector("button.cursor-pointer.bg-green");
    await this.page.click("button.cursor-pointer.bg-green");
  }

  async openOffers() {
    await this.page.type(
      'input[type="text"][placeholder="Search settings"]',
      "offers",
      { delay: 100 }
    );
    await this.page.goto(
      "https://ghost-5ehz.onrender.com/ghost/#/settings/offers/edit"
    );

  }



  async fillOfferForm(discountName) {
    await this.page.waitForSelector(
      'input[type="text"][placeholder="Black Friday"]'
    );
    await this.page.type(
      'input[type="text"][placeholder="Black Friday"]',
      discountName,
      { delay: 100 }
    );
    await this.page.type('input[type="number"]', "5");
  }

  async saveOffer() {
    
    await this.page.click("button.cursor-pointer.bg-black");
    await new Promise((r) => setTimeout(r, 2000));
  }

  async publishOffer() {
    await new Promise((r) => setTimeout(r, 4000));
    await this.page.waitForSelector('button.cursor-pointer.p-2');
    await this.page.click('button.cursor-pointer.p-2');
  }
}
module.exports = OfferPage;
