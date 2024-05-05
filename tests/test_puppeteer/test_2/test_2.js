// Test relacionado con Crea un descuento a una membresía
const puppeteer = require("puppeteer");
const path = require("path");
const pathfolder = path.resolve(__dirname);
const faker = require('faker');


(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
    });

    const page = await browser.newPage();

    console.log("Iniciando test Crea un descuento a una membresía");

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

    // Entrar a sección de ajustes
    await page.click('[data-test-nav="settings"]');
    
    await page.waitForSelector(
      "#admin-x-settings-scroller > div > div:nth-child(3) > div > div:nth-child(3) > section > div.block.undefined > div > div > button"
    );

    // Buscar la sección de descuentos
    await page.type(
      'input[type="text"][placeholder="Search settings"]',
      "offers",
      { delay: 100 }
    );

    // POR EL MOMENTO LE HAGO CLICK YO
    // await page.click("button.cursor-pointer");

    await new Promise((r) => setTimeout(r, 2000));

    // Crear descuento
    await page.click("button.cursor-pointer.bg-green");

    // Generate a fake discount name
    const discountName = faker.commerce.productAdjective();

    console.log('Discount', discountName);
    const discountCompleteName = `Descuento ${discountName}`;

    // llenar formulario oferta
    await page.waitForSelector('input[type="text"][placeholder="Black Friday"]');
    await page.type(
      'input[type="text"][placeholder="Black Friday"]',
      discountCompleteName,
      { delay: 100 }
    );
    await page.type('input[type="number"]', "5");
    await page.screenshot({ path: `${pathfolder}/img/2_se_llena_formulario.png` });

    await new Promise((r) => setTimeout(r, 2000));
    
    await page.click("button.cursor-pointer.bg-black");
    await new Promise((r) => setTimeout(r, 2000));


    await page.screenshot({ path: `${pathfolder}/img/3_oferta_creada.png` });
    await page.click('button.cursor-pointer.p-2');

    //Cerrar sesión desde ajustes
    await page.click('button[data-testid="exit-settings"]');
    await page.waitForSelector(
      "body > div.gh-app > div > nav.gh-nav > div > header"
    );

    //Cerrar sesión desde menu principal
    await page.click(".ember-basic-dropdown-trigger");
    await page.waitForSelector(".user-menu-signout");
    await page.click(".user-menu-signout");
    await page.waitForSelector("#identification");

    await page.screenshot({ path: `${pathfolder}/img/4_finaliza.png` });

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
