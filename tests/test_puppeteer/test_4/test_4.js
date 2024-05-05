// Test relacionado con Crear un Post  con Acceso a solo la membresía.
const puppeteer = require("puppeteer");
const path = require("path");
const pathfolder = path.resolve(__dirname);

const faker = require("faker");

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
    });

    const page = await browser.newPage();

    console.log(
      "Iniciando test Crear un Post con Acceso a solo la membresía."
    );

    // Login
    await page.goto("https://ghost-5ehz.onrender.com/ghost/#/signin");
    await page.waitForSelector("#identification");
    await page.type("#identification", "test@test.com", { delay: 100 });
    await page.type("#password", "Test@test25", { delay: 100 });
    await page.click("#ember5 > span");
    await page.waitForSelector(
      "body > div.gh-app > div > nav.gh-nav > div > header"
    );
    await page.screenshot({ path: `${pathfolder}/img/1_after-login.png` });

    // Entrar a posts y crear un post
    await page.click('[data-test-nav="new-story"]');

    const faketitle = faker.name.title();
    console.log("Fake Name:", faketitle);
    await page.type("[data-test-editor-title-input]", faketitle, {
      delay: 200,
    });

    // Cambiar la visibilidad del post a solo la paga
    await page.click("button.settings-menu-toggle");

    await page.select('select[data-test-select="post-visibility"]', "paid");

    await page.screenshot({ path: `${pathfolder}/img/3_change_visibility.png` });


    await new Promise((r) => setTimeout(r, 2000));

    // Guardar el Post
    await page.screenshot({ path: `${pathfolder}/img/2_create-post.png` });

    await page.waitForSelector('button[data-test-button="publish-flow"]');
    await page.click('button[data-test-button="publish-flow"]');

    await page.waitForSelector('button[data-test-button="continue"]');
    await page.click('button[data-test-button="continue"]');

    await page.waitForSelector('button[data-test-button="confirm-publish"]');
    await page.click('button[data-test-button="confirm-publish"]');

    await page.waitForSelector('button[data-test-button="back-to-editor"]', {
      timeout: 30000,
    });
    await page.screenshot({ path: `${pathfolder}/img/4_publish.png` });

    await page.goBack();

    //Cerrar sesión desde menu principal
    await page.click('[data-test-nav="dashboard"]');
    await new Promise((r) => setTimeout(r, 1000));

    await page.click(".ember-basic-dropdown-trigger");
    await page.waitForSelector(".user-menu-signout");
    await page.click(".user-menu-signout");

    await page.waitForSelector("#identification");
    await page.screenshot({ path: `${pathfolder}/img/5_finaliza.png` });

    console.log("Test finalizado con éxito");

    await browser.close();
  } catch (error) {
    console.error("An error occurred:", error);
    // Take a screenshot if an error occurs
    if (page) {
      await page.screenshot({ path: `${pathfolder}/img/error.png` });
    }
    if (browser) {
      await browser.close();
    }
  }
})();
