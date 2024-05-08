class TagsPage {

    constructor(page) {
        this.page = page;
    }

    async openNewTag() {
        await this.page.waitForSelector('a[href="#/tags/new/"]');
        await this.page.click('a[href="#/tags/new/"]');
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
    }

    async editTagSlug(slug) {
        await this.page.waitForSelector('input[name="slug"]')
        await this.page.$eval('input[name="slug"]', element => {
            element.value = '';
        });

        await this.page.type('input[name="slug"]', slug);
        await this.page.waitForSelector('section.view-actions');
        try {
            await this.page.click('section.view-actions');
        } catch (error) {
            console.error("Error durante la navegación:", error);
        }

    }

    async deleteTag() {
        await this.page.evaluate(() => {
            Array.from(document.querySelectorAll('span')).filter(span => {
                return span.innerText == 'Delete tag' // filter il for specific text
            }).forEach(element => {
                if (element) element.click(); // click on il with specific text
            });
        });
        await this.page.evaluate(() => {
            const modal = document.querySelector('.modal-content'); // Seleccionar el modal
            if (modal) {
                const deleteButton = modal.querySelector('.gh-btn-red'); // Seleccionar el botón "Delete" dentro del modal
                if (deleteButton) {
                    deleteButton.click(); // Hacer clic en el botón "Delete"
                }
            }
        });

    }

    async newTag(name, slug, description) {
        await this.page.waitForSelector('input[name="name"]');
        await this.page.waitForSelector('input[name="slug"]');
        await this.page.waitForSelector('textarea[name="description"]');
        await this.page.type('input[name="name"]', name);
        await this.page.type('input[name="slug"]', slug);
        await this.page.type('textarea[name="description"]', description);
        await this.page.waitForSelector('section.view-actions');
        try {
            await this.page.click('section.view-actions');
            await this.page.waitForNavigation();
        } catch (error) {
            console.error("Error durante la navegación:", error);
        }
    }

}

module.exports = TagsPage;