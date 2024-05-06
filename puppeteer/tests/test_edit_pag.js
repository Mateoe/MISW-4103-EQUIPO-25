const puppeteer = require("puppeteer");
const path = require("path");

// Definir el directorio para guardar las capturas de pantalla
const pathfolder = path.resolve(__dirname, "test_editar_nombre_pagina");

// Crear el directorio si no existe
const fs = require('fs');
if (!fs.existsSync(pathfolder)) {
  fs.mkdirSync(pathfolder, { recursive: true });
}

(async () => {
  let page;
  let browser;
  try {
    browser = await puppeteer.launch({ headless: false, defaultViewport: null });
    page = await browser.newPage();

    console.log("Iniciando test para editar el nombre de una página en Ghost");

    // Login
    await page.goto("https://ghost-5ehz.onrender.com/ghost/#/signin");
    await page.waitForSelector("#identification");
    await page.type("#identification", "test@test.com", { delay: 100 });
    await page.type("#password", "Test@test25", { delay: 100 });
    await page.click("#ember5 > span");
    await page.waitForSelector("body > div.gh-app > div > nav.gh-nav > div > header");
    await page.screenshot({ path: `${pathfolder}/1_after-login.png` });

    // Navegar a la lista de páginas
    await page.click('a[href="#/pages/"]');
    await page.waitForSelector('.gh-list-row');
    await page.screenshot({ path: `${pathfolder}/2_after-navigate-to-pages.png` });

    // Seleccionar la primera página para editar
    const pageItem = await page.$('.gh-list-row');
    if (pageItem) {
      await pageItem.click();
      await page.waitForSelector('textarea.gh-editor-title');
      const nuevoTitulo = "Página Editada " + new Date().getTime();
      await page.click('textarea.gh-editor-title', { clickCount: 3 });
      await page.type('textarea.gh-editor-title', nuevoTitulo, { delay: 100 });
      await page.screenshot({ path: `${pathfolder}/3_after-editing-title.png` });

      // Guardar cambios
      await page.click('.gh-publishmenu-trigger');
      await page.click('.gh-publishmenu-button');
      await page.screenshot({ path: `${pathfolder}/4_after-saving.png` });

      // Volver a la lista de páginas
      await page.click('a[href="#/pages/"]');
      await page.waitForSelector('.gh-list-row');
      await page.screenshot({ path: `${pathfolder}/5_after-back-to-pages.png` });

      // Verificar que el nombre se haya actualizado
      const pageTitles = await page.$$eval('.gh-list-row .gh-content-entry-title', titles =>
        titles.map(title => title.textContent.trim())
      );

      if (pageTitles.includes(nuevoTitulo)) {
        console.log("El nombre de la página fue actualizado exitosamente.");
      } else {
        console.log("Error: El nombre de la página no fue actualizado.");
      }

      await page.screenshot({ path: `${pathfolder}/6_after-verifying-title.png` });
    }

    // Cerrar sesión
    await page.click(".ember-basic-dropdown-trigger");
    await page.waitForSelector(".user-menu-signout");
    await page.click(".user-menu-signout");

    await page.waitForSelector("#identification");

    console.log("Test finalizado con éxito");
    await page.screenshot({ path: `${pathfolder}/7_logout.png` });

    await browser.close();
  } catch (error) {
    if (page) {
      await page.screenshot({ path: `${pathfolder}/error.png` });
    }
    if (browser) {
      await browser.close();
    }
  }
})();

