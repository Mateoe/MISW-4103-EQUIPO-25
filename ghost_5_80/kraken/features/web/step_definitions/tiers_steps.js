When("I click on the Open Settings link", async function () {
  let element = await this.driver.$('[data-test-nav="settings"]');
  return await element.click();
});

When("I click on the New Tier link", async function () {
  let element = await this.driver.$("button.cursor-pointer.bg-green.tiers");
  return await element.click();
});

When("I enter tier name {string}", async function (description) {
  let element = await this.driver.$('input[type="text"][placeholder="Bronze"]');
  return await element.setValue(description);
});

When("I enter tier description {string}", async function (description) {
  let element = await this.driver.$(
    'input[type="text"][placeholder="Full access to premium content"]'
  );
  return await element.setValue(description);
});

When("I enter tier priceMonth {string}", async function (description) {
  let element = await this.driver.$('input[type="text"][placeholder="5"]');
  return await element.setValue(description);
});

When("I enter tier priceAnual {string}", async function (description) {
  let element = await this.driver.$('input[type="text"][placeholder="50"]');
  return await element.setValue(description);
});

When("I enter tier benefit {string}", async function (description) {
  let element = await this.driver.$(
    'input[type="text"][placeholder="Expert analysis"]'
  );
  return await element.setValue(description);
});


When("I click on the Safe Tier link", async function () {
  let element = await this.driver.$("button.cursor-pointer.bg-black");
  return await element.click();
});

When("I click on the Publish Tier link", async function () {
  let element = await this.driver.$("button.cursor-pointer.p-2");
  return await element.click();
});



Then("I validate that the tier was created {string}", async function (name) {
  let element = await this.driver.$(`//a[contains(text(), ${name})]`);

  if (element) {
    console.log("El elemento se ha creado correctamente.");
    return true;
  } else {
    console.log("El elemento no se ha creado.");
    return false;
  }
});
