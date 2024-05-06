const { Given, When, Then } = require('@kraken-js/cucumber');

When('I click on the Pages link', async function () {
    let element = await this.driver.$('[data-test-nav="pages"]');
    return await element.click();
});

When('I click on the New page link', async function () {
    let element = await this.driver.$('.gh-btn-primary');
    return await element.click();
});

When('I enter page-title {string}', async function (title) {
    let element = await this.driver.$('textarea.gh-editor-title');
    return await element.setValue(title);
});

When('I enter page-content {string}', async function (content) {
    let element = await this.driver.$('.koenig-editor__editor');
    return await element.setValue(content);
});

When('I click publish page', async function () {
    let publishButton = await this.driver.$('.gh-publishmenu-trigger');
    await publishButton.click();
    let publishConfirmButton = await this.driver.$('button.gh-publishmenu-button');
    return await publishConfirmButton.click();
});

Then('I validate that the page was created {string}', async function (title) {
    let pagesLink = await this.driver.$('[data-test-nav="pages"]');
    await pagesLink.click();
    let pageExists = await this.driver.$(`h3.gh-content-entry-title=${title}`);
    return pageExists.isExisting();
});
