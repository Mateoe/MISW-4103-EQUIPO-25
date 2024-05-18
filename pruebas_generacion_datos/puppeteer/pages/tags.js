class TagsPage {

    constructor(page, path, logStep, screenshotsDir, screenshots) {
        this.page = page;
        this.path = path;
        this.logStep = logStep;
        this.screenshotsDir = screenshotsDir;
        this.screenshots = screenshots;
    }

    async openNewTag() {
        await this.page.waitForSelector('a[href="#/tags/new/"]');
        await this.page.click('a[href="#/tags/new/"]');
        await this.logStep(
            this.screenshots.text2,
            this.path.join(this.screenshotsDir, this.screenshots.image2)
        );
    }

    async openEditTag(tagName) {
        await this.page.waitForSelector('h3.gh-tag-list-name')
        await this.page.evaluate((tagName) => {
            const elements = document.querySelectorAll('h3.gh-tag-list-name');
            for (let i = 0; i < elements.length; i++) {
                if (elements[i].textContent.trim() === tagName) {
                    elements[i].click();
                    return;
                }
            }
            return;
        }, tagName);
        await this.logStep(
            this.screenshots.text6,
            this.path.join(this.screenshotsDir, this.screenshots.image6)
        );
    }

    async editTagSlug(slug) {
        await this.page.waitForSelector('input[name="slug"]')
        await this.page.$eval('input[name="slug"]', element => {
            element.value = '';
        });

        await this.page.type('input[name="slug"]', slug);
        await this.page.waitForSelector('section.view-actions');
        await this.logStep(
            this.screenshots.text7,
            this.path.join(this.screenshotsDir, this.screenshots.image7)
        );
        await this.page.click('section.view-actions');
        await this.logStep(
            this.screenshots.text8,
            this.path.join(this.screenshotsDir, this.screenshots.image8)
        );

    }

    async deleteTag() {
        await this.page.evaluate(() => {
            Array.from(document.querySelectorAll('span')).filter(span => {
                return span.innerText == 'Delete tag'
            }).forEach(element => {
                if (element) element.click();
            });
        });
        await this.logStep(
            this.screenshots.text7,
            this.path.join(this.screenshotsDir, this.screenshots.image7)
        );
        await this.page.evaluate(() => {
            const modal = document.querySelector('.modal-content');
            if (modal) {
                const deleteButton = modal.querySelector('.gh-btn-red');
                if (deleteButton) {
                    deleteButton.click();
                }
            }
        });
        await this.logStep(
            this.screenshots.text8,
            this.path.join(this.screenshotsDir, this.screenshots.image8)
        );
    }

    async newTag(name, slug, description) {
        await this.page.waitForSelector('input[name="name"]');
        await this.page.waitForSelector('input[name="slug"]');
        await this.page.waitForSelector('textarea[name="description"]');
        await this.page.$eval('input[name="name"]', element => {
            element.value = '';
        });
        await this.page.type('input[name="name"]', name);
        await this.logStep(
            this.screenshots.text3,
            this.path.join(this.screenshotsDir, this.screenshots.image3)
        );
        await this.page.$eval('input[name="slug"', element => {
            element.value = '';
        });
        await this.page.type('input[name="slug"]', slug);
        await this.logStep(
            this.screenshots.text4,
            this.path.join(this.screenshotsDir, this.screenshots.image4)
        );
        await this.page.$eval('textarea[name="description"]', element => {
            element.value = '';
        });
        await this.page.type('textarea[name="description"]', description);
        await this.logStep(
            this.screenshots.text5,
            this.path.join(this.screenshotsDir, this.screenshots.image5)
        );
        await this.page.click('section.view-actions');
        await this.page.waitForSelector('[data-test-task-button-state="success"], [data-test-task-button-state="failure"]');
        await this.logStep(
            this.screenshots.text6,
            this.path.join(this.screenshotsDir, this.screenshots.image6)
        );
    }

}

module.exports = TagsPage;