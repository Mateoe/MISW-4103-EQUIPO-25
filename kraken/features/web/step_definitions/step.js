const { Given, When, Then } = require('@cucumber/cucumber');

When('I enter email {string}', async function (email) {
    let element = await this.driver.$('#identification');
    return await element.setValue(email);
});
When('I enter password {string}', async function (password) {
    let element = await this.driver.$('#password');
    return await element.setValue(password);
});
When('I click login', async function() {
    let element = await this.driver.$('[data-test-button="sign-in"]');
    return await element.click();
})
When('I click on the Tags link', async function() {
    let element = await this.driver.$('[data-test-nav="tags"]');
    return await element.click();
})
When('I click on the New tag link', async function() {
    let element = await this.driver.$('.gh-btn-primary');
    return await element.click();
})
When('I enter tag-name {string}', async function (name) {
    let element = await this.driver.$('#tag-name');
    return await element.setValue(name);
});
When('I enter tag-description {string}', async function (description) {
    let element = await this.driver.$('#tag-description');
    return await element.setValue(description);
});
When('I click save', async function() {
    let element = await this.driver.$('[data-test-button="save"]');
    return await element.click();
})
Then('I validate that the tag was created {string}', async function (name) {
    let element = await this.driver.$(`//a[contains(text(), ${name})]`);
    
    if (element) {
        console.log("El elemento se ha creado correctamente.");
        return true;
    } else {
        console.log("El elemento no se ha creado.");
        return false;
    }
})

When('I sign out', async function () {
    let avatarElement = await this.driver.$('.gh-user-avatar');
    if (avatarElement) {
        await avatarElement.click();
    } else {
        return Promise.reject("No se pudo encontrar el avatar del usuario.");
    }

    let signOutElement = await this.driver.$('.user-menu-signout');
    if (!signOutElement) {
        await this.driver.wait(async () => {
            signOutElement = await this.driver.$('.user-menu-signout');
            return signOutElement !== null;
        }, { timeout: 5000, timeoutMsg: 'El enlace de cierre de sesión no está presente.' });
    }

    if (signOutElement) {
        await signOutElement.click();
    } else {
        return Promise.reject("No se pudo encontrar el enlace de cierre de sesión.");
    }
});
