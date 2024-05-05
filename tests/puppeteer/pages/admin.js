class AdminPage {
    constructor(page) {
        this.page = page;
    }

    async openTags() {
        await this.page.waitForSelector('a[data-test-nav="tags"]');
        await this.page.click('a[data-test-nav="tags"]');
        await this.page.waitForSelector('section.view-container.content-list ol.tags-list');
    }

    async openMembers() {
        await this.page.waitForSelector('a[data-test-nav="members"]');
        await this.page.click('a[data-test-nav="members"]');
        await this.page.waitForSelector('section.view-container.members-list-container-stretch');
    }

    async logOut() {
        await this.page.waitForSelector('div.gh-user-avatar');
        await this.page.click('div.gh-user-avatar');
        await this.page.waitForSelector('a[href="#/signout/"]');
        await this.page.click('a[href="#/signout/"]');
        await this.page.waitForNavigation();
    }
}

module.exports = AdminPage;
