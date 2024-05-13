When("I click on the New post link", async function () {
  let element = await this.driver.$('a[href="#/editor/post/"]');
  return await element.click();
});

When("I enter post-title {string}", async function (name) {
  let element = await this.driver.$("#data-test-editor-title-input");
  return await element.setValue(name);
});

When("I enter tag name {string}", async function (name) {
  let element = await this.driver.$(
    ".ember-power-select-trigger-multiple-input"
  );
  return await element.setValue(name);
});


When("I enter subscription visibility {string}", async function (name) {
  let element = await this.driver.$(
    "select[data-test-select='post-visibility']"
  );
  return await element.setValue(name);
});


When("I click on the Publish Flow", async function () {
  let element = await this.driver.$('button[data-test-button="publish-flow"]');
  return await element.click();
});

When("I click on the Final Review Flow", async function () {
  let element = await this.driver.$('button[data-test-button="continue"]');
  return await element.click();
});

When("I click on the Confirm Publish Flow", async function () {
  let element = await this.driver.$(
    'button[data-test-button="confirm-publish"]'
  );
  return await element.click();
});

When("I click on the Retun to Posts", async function () {
  let element = await this.driver.$('a[data-test-nav="posts"]');
  return await element.click();
});

When("I click on the Open Posts", async function () {
  let element = await this.driver.$('a[data-test-nav="posts"]');
  return await element.click();
});

Then("I validate that the post was created {string}", async function (name) {
  let element = await this.driver.$(`//a[contains(text(), ${name})]`);

  if (element) {
    console.log("El elemento se ha creado correctamente.");
    return true;
  } else {
    console.log("El elemento no se ha creado.");
    return false;
  }
});
