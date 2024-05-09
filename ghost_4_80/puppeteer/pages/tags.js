class TagsPage {

    constructor(page) {
        this.page = page;
    }

    async openNewTag() {
        await this.page.waitForSelector('a[href="#/tags/new/"].ember-view.gh-btn.gh-btn-primary');
        await this.page.click('a[href="#/tags/new/"].ember-view.gh-btn.gh-btn-primary');
    }

    async openEditTag(tagName) {
        await this.page.waitForSelector(`h3[data-test-tag-name]`);
        const tagElement = await this.page.$(`h3[data-test-tag-name]`);

        if (tagElement && (await tagElement.evaluate(el => el.textContent.trim())) === tagName) {
            await tagElement.click();
        }
    }

    async editTagSlug(slug) {
        await this.page.waitForSelector('#tag-slug')
        await this.page.$eval('#tag-slug', element => {
            element.value = '';
        });

        await this.page.type('#tag-slug', slug);
        await this.page.waitForSelector('button[data-test-button="save"]');
        try {
            await this.page.click('button[data-test-button="save"]');
        } catch (error) {
            console.error("Error durante la navegación:", error);
        }
        
    }

    async deleteTag(){
        await this.page.waitForSelector('button[data-test-button="delete-tag"]');
        await this.page.click('button[data-test-button="delete-tag"]');
        await this.page.waitForSelector('button[data-test-button="confirm"]', { visible: true });
        await this.page.click('button[data-test-button="confirm"]');
    }

    async newTag(name, slug, description) {
        await this.page.waitForSelector('input[data-test-input="tag-name"]');
        await this.page.waitForSelector('input[data-test-input="tag-slug"]');
        await this.page.waitForSelector('textarea[data-test-input="tag-description"]');
        await this.page.type('input[data-test-input="tag-name"]', name);
        await this.page.type('input[data-test-input="tag-slug"]', slug);
        await this.page.type('textarea[data-test-input="tag-description"]', description);
        await this.page.waitForSelector('button[data-test-button="save"]');
        try {
            await this.page.click('button[data-test-button="save"]');
            await this.page.waitForNavigation();
        } catch (error) {
            console.error("Error durante la navegación:", error);
        }
    }

}

module.exports = TagsPage;