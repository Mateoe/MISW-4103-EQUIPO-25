class MembersPage {

    constructor(page, path, logStep, screenshotsDir, screenshots) {
        this.page = page;
        this.path = path;
        this.logStep = logStep;
        this.screenshotsDir = screenshotsDir;
        this.screenshots = screenshots;
    }

    async openNewMember() {
        await this.page.waitForSelector('a[href="#/members/new/"].ember-view.gh-btn.gh-btn-primary');
        await this.page.click('a[href="#/members/new/"].ember-view.gh-btn.gh-btn-primary');
        await this.logStep(
            this.screenshots.text2,
            this.path.join(this.screenshotsDir, this.screenshots.image2)
        );
    }

    async newMember(name, email, labels, note) {
        await this.page.waitForSelector('input[data-test-input="member-name"]');
        await this.page.waitForSelector('input[data-test-input="member-email"]');
        await this.page.waitForSelector('input.ember-power-select-trigger-multiple-input');
        await this.page.waitForSelector('textarea[data-test-input="member-note"]');
        await this.page.type('input[data-test-input="member-name"]', name);
        await this.logStep(
            this.screenshots.text3,
            this.path.join(this.screenshotsDir, this.screenshots.image3)
        );
        await this.page.type('input[data-test-input="member-email"]', name);
        await this.logStep(
            this.screenshots.text4,
            this.path.join(this.screenshotsDir, this.screenshots.image4)
        );
        for (const label of labels) {
            await this.page.type('input.ember-power-select-trigger-multiple-input', label);
            await this.page.keyboard.press('Enter');
        }
        await this.logStep(
            this.screenshots.text5,
            this.path.join(this.screenshotsDir, this.screenshots.image5)
        );
        await this.page.type('textarea[data-test-input="member-note"]', note);
        await this.logStep(
            this.screenshots.text6,
            this.path.join(this.screenshotsDir, this.screenshots.image6)
        );
        await this.page.click('section.view-actions');
        await this.page.waitForSelector('[data-test-task-button-state="success"], [data-test-task-button-state="failure"]');
        await this.logStep(
            this.screenshots.text7,
            this.path.join(this.screenshotsDir, this.screenshots.image7)
        );
  
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