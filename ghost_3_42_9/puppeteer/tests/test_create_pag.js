const puppeteer = require("puppeteer");
const path = require("path");

// Definir el directorio para guardar las capturas de pantalla
const pathfolder = path.resolve(__dirname, "test_crear_publicar_pagina");

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

    console.log("Iniciando test para crear y verificar una nueva página en Ghost");

    // Login
    await page.goto("https://ghost-5ehz.onrender.com/ghost/#/signin");
    await page.waitForSelector("#identification");
    await page.type("#identification", "test@test.com", { delay: 100 });
    await page.type("#password", "Test@test25", { delay: 100 });
    await page.click("#ember5 > span");
    await page.waitForSelector("body > div.gh-app > div > nav.gh-nav > div > header");
    await page.screenshot({ path: `${pathfolder}/1_after-login.png` });

    // Crear nueva página
    await page.click('a[href="#/pages/"]');
    await page.waitForSelector('a[href="#/editor/page/"]');
    await page.click('a[href="#/editor/page/"]');

    // Añadir el título
    await page.waitForSelector('textarea.gh-editor-title', { timeout: 60000 });
    const tituloPagina = "Nueva Página " + new Date().getTime();
    await page.type('textarea.gh-editor-title', tituloPagina, { delay: 100 });

    // Añadir el contenido de la página utilizando el selector dado
    await page.waitForSelector('.koenig-react-editor [contenteditable="true"]', { timeout: 60000 });
    const contenidoPagina = 'Este es el contenido de la nueva página.';
    await page.type('.koenig-react-editor [contenteditable="true"]', contenidoPagina, { delay: 100 });

    // Publicar página
    await page.waitForSelector('button[data-test-button="publish-flow"]', { timeout: 60000 });
    await page.click('button[data-test-button="publish-flow"]');
    await page.screenshot({ path: `${pathfolder}/2_publicar_pagina.png` });

    // Continuar con la revisión final
    await page.waitForSelector('button[data-test-button="continue"]', { timeout: 60000 });
    await page.click('button[data-test-button="continue"]');
    await page.screenshot({ path: `${pathfolder}/3_revision_final.png` });

    // Confirmar publicación
    await page.waitForSelector('button[data-test-button="confirm-publish"]', { timeout: 60000 });
    await page.click('button[data-test-button="confirm-publish"]');
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: `${pathfolder}/4_confirmar_publicacion.png` });

    // Volver a la lista de páginas
    await page.waitForSelector('a[href="#/pages/"]');
    await page.click('a[href="#/pages/"]');
    await page.screenshot({ path: `${pathfolder}/5_volver_paginas.png` });

    // Verificar que la página fue creada
    const pageTitles = await page.$$eval('.gh-list-row .gh-content-entry-title', titles =>
      titles.map(title => title.textContent.trim())
    );

    if (pageTitles.includes(tituloPagina)) {
      console.log("La nueva página fue creada exitosamente.");
    } else {
      console.log("Error: La página no fue creada.");
    }

    await page.screenshot({ path: `${pathfolder}/6_revisar_pagina.png` });

    await page.waitForSelector('a[href="#/pages/"]');
    await page.click('a[href="#/pages/"]');
    
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
