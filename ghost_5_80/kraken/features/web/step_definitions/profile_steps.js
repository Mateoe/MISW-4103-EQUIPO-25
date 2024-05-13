const { Given, When, Then } = require('@kraken-js/cucumber');

When('I click on the Profile link', async function () {
    let profileLink = await this.driver.$('[data-test-nav="user-profile"]');
    return await profileLink.click();
});

When('I edit profile-name {string}', async function (name) {
    let nameField = await this.driver.$('input[type="text"]');
    await nameField.setValue(name);
});

When('I save profile changes', async function () {
    let saveButton = await this.driver.$('button span:contains("Save & close")');
    return await saveButton.click();
});

Then('I validate that the profile name was updated {string}', async function (name) {
    let profileLink = await this.driver.$('[data-test-nav="user-profile"]');
    await profileLink.click();
    let nameField = await this.driver.$('input[type="text"]');
    let value = await nameField.getValue();
    return value === name;
});
