// Test relacionado con crear una membresía premium en ghost
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

    console.log("Iniciando test crear una membresía premium en ghost");

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

    // Crear membresía premium
    await page.click(
      "#admin-x-settings-scroller > div > div:nth-child(3) > div > div:nth-child(3) > section > div.block.undefined > div > div > button"
    );
    await page.waitForSelector("#modal-backdrop > section > div.p-7.py-0");

    const subscriptionType = faker.commerce.product();

    const subscriptionCompleteType = `Membresía ${subscriptionType}`;

    // Llenar formulario
    await page.type(
      'input[type="text"][placeholder="Bronze"]',
      subscriptionCompleteType,
      {
        delay: 100,
      }
    );
    await page.type(
      'input[type="text"][placeholder="Full access to premium content"]',
      "Membrería Premium ",
      { delay: 100 }
    );
    await page.type('input[type="text"][placeholder="5"]', "5", { delay: 100 });
    await page.type('input[type="text"][placeholder="50"]', "48", {
      delay: 100,
    });
    await page.type(
      'input[type="text"][placeholder="Expert analysis"]',
      "Obtén acceso a todo el contenido web",
      { delay: 100 }
    );
    await page.click("button.cursor-pointer.bg-green");
    await new Promise((r) => setTimeout(r, 1000));
    await page.screenshot({
      path: `${pathfolder}/img/2_formulario-membresia.png`,
    });
    await page.click(
      "#modal-backdrop > section > div.w-100.sticky.bottom-\\[-24px\\].z-\\[297\\].m-0.box-border.p-0 > div.sticky.z-\\[299\\].mb-\\[-24px\\].flex.items-center.justify-between.h-\\[96px\\].bg-white.dark\\:bg-black > div > div.flex.gap-3 > div > button.cursor-pointer.bg-black.text-white.dark\\:bg-white.dark\\:text-black.hover\\:bg-grey-900.inline-flex.items-center.justify-center.whitespace-nowrap.rounded.text-sm.transition.font-bold.h-\\[34px\\].px-4.min-w-\\[80px\\]"
    );
    await new Promise((r) => setTimeout(r, 1000));
    await page.waitForSelector('button[data-testid="exit-settings"]');
    await page.screenshot({
      path: `${pathfolder}/img/3_after-formulario-membresia.png`,
    });

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
