class MembersPage {

    constructor(page) {
        this.page = page;
    }

    async openNewMember() {
        await this.page.waitForSelector('a[href="#/members/new/"].ember-view.gh-btn.gh-btn-primary');
        await this.page.click('a[href="#/members/new/"].ember-view.gh-btn.gh-btn-primary');
    }

    async newMember(name, email) {
        await this.page.waitForSelector('input[data-test-input="member-name"]');
        await this.page.waitForSelector('input[data-test-input="member-email"]');
        await this.page.type('input[data-test-input="member-name"]', name);
        await this.page.type('input[data-test-input="member-email"]', email);
        await this.page.waitForSelector('button[data-test-button="save"]');
        try {
            await this.page.click('button[data-test-button="save"]');
            await this.page.waitForNavigation();
        } catch (error) {
            console.error("Error durante la navegación:", error);
        }
    }

    async openEditMember(memberName) {
        await this.page.waitForSelector(`h3.ma0.pa0.gh-members-list-name`);
        const memberElement = await this.page.$(`h3.ma0.pa0.gh-members-list-name`);

        if (memberElement && (await memberElement.evaluate(el => el.textContent.trim())) === memberName) {
            await memberElement.click();
        }
    }

    async deleteMember(){
        await this.page.waitForSelector('button[data-test-button="member-actions"]');
        await this.page.click('button[data-test-button="member-actions"]');
        await this.page.waitForSelector('button[data-test-button="delete-member"]');
        await this.page.click('button[data-test-button="delete-member"]');
        await this.page.waitForSelector('button[data-test-button="confirm"]', { visible: true });
        await this.page.click('button[data-test-button="confirm"]');
    }
}
module.exports = MembersPage;