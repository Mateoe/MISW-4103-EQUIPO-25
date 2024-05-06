const puppeteer = require("puppeteer");
const path = require("path");

// Definir el directorio para guardar las capturas de pantalla
const pathfolder = path.resolve(__dirname, "test_editar_ubicacion");

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

    console.log("Iniciando test para editar la ubicación del perfil de usuario en Ghost");

    // Login
    await page.goto("https://ghost-5ehz.onrender.com/ghost/#/signin");
    await page.waitForSelector("#identification");
    await page.type("#identification", "test@test.com", { delay: 100 });
    await page.type("#password", "Test@test25", { delay: 100 });
    await page.click("#ember5 > span");
    await page.waitForSelector("body > div.gh-app > div > nav.gh-nav > div > header");
    await page.screenshot({ path: `${pathfolder}/1_after-login.png` });

    // Abrir el menú de usuario
    await page.click('#ember23');
    await page.waitForSelector('a[data-test-nav="user-profile"]');
    await page.screenshot({ path: `${pathfolder}/2_after-open-user-menu.png` });

    // Navegar a la página de perfil
    await page.click('a[data-test-nav="user-profile"]');
    await page.waitForSelector('input[type="text"]');
    await page.screenshot({ path: `${pathfolder}/3_after-navigate-to-profile.png` });

    // Editar la ubicación del perfil
    const nuevaUbicacion = "Bogotá, Colombia";
    const ubicacionSelector = 'input[placeholder="Location"]'; // Asumiendo que el campo tiene un placeholder "Location"
    await page.click(ubicacionSelector, { clickCount: 3 });
    await page.type(ubicacionSelector, nuevaUbicacion, { delay: 100 });
    await page.screenshot({ path: `${pathfolder}/4_after-editing-location.png` });

    // Guardar cambios
    await page.click('button span:contains("Save & close")');
    await page.screenshot({ path: `${pathfolder}/5_after-saving.png` });

    // Salir del perfil
    await page.click('button[data-testid="exit-settings"]');
    await page.waitForSelector('#ember23');
    await page.screenshot({ path: `${pathfolder}/6_after-exit-profile.png` });

    // Cerrar sesión
    await page.click('#ember23');
    await page.waitForSelector('a.user-menu-signout');
    await page.click('a.user-menu-signout');
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
