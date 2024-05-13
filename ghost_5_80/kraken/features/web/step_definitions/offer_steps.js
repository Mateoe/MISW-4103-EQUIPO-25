


When("I click on the Open Settings link", async function () {
  let element = await this.driver.$('[data-test-nav="settings"]');
  return await element.click();
});


When("I click on the New Offer link", async function () {
  let element = await this.driver.$("button.cursor-pointer.bg-green");
  return await element.click();
});


When("I enter offer name {string}", async function (description) {
  let element = await this.driver.$("input[type='text'][placeholder='Black Friday']");
  return await element.setValue(description);
});

When("I click on the Safe Offer link", async function () {
  let element = await this.driver.$("button.cursor-pointer.bg-black");
  return await element.click();
});

When("I click on the Publish Offer link", async function () {
  let element = await this.driver.$("button.cursor-pointer.p-2");
  return await element.click();
});


Then("I validate that the offer was created {string}", async function (name) {
  let element = await this.driver.$(`//a[contains(text(), ${name})]`);

  if (element) {
    console.log("El elemento se ha creado correctamente.");
    return true;
  } else {
    console.log("El elemento no se ha creado.");
    return false;
  }
});

