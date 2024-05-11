const path = require("path");
const LoginPage = require("../pages/login");
const initialSettings = require("../config/initialSettings");
const AdminPage = require("../pages/admin");
const PagePage = require("../pages/pages");

async function testNewPage() {
  console.log("REALIZANDO PRUEBA E2E DE CREAR UNA PAGINA");
  const url = "https://ghost-3-42-9.onrender.com/ghost/#/signin";
  const { page, logStep, screenshotsDir, browser } =
    await initialSettings("GHOST_3_newPage");

  const screenshots = {
    text1: "Navegación a la página de inicio de sesión",
    image1: "01_pageLogin.png",
    text2: "Ingresar el usuario",
    image2: "02_userName.png",
    text3: "Ingresar el la contraseña",
    image3: "03_password.png",
    text4: "Inicio de sesión exitoso",
    image4: "04_loginSuccess.png",
    text5: "Ingreso a la interfaz de pages",
    image5: "05_newPages.png",
    text6: "Ingreso al formulario de creacion de pages",
    image6: "06_newPageInterface.png",
    text7: "Se escribe el titulo del page",
    image7: "07_fillNewPageForm.png",
    text8: "Publicación de page",
    image8: "08_publishPage.png",
    text9: "Confirmación de publicación de page",
    image9: "09_confirmPublish.png",
    text10: "Retornar a pagina de pages",
    image10: "10_returnToPages.png",
    text11: "Abrir listado de pages",
    image11: "11_openPages.png",
    text12_1: "Nuevo page creado exitosamente",
    image12_1: "12_newpageSuccess.png",
    text12_2: "No se creó el page",
    image12_2: "12_newpageError.png",
    text13: "Abrir Dropdown Menu",
    image13: "13_dropdownMenu.png",
    text14: "Se cierra sesión",
    image14: "14_logOut.png",
  };

  const loginPage = new LoginPage(
    page,
    path,
    logStep,
    screenshotsDir,
    screenshots
  );
  const adminPage = new AdminPage(
    page,
    path,
    logStep,
    screenshotsDir,
    screenshots
  );
  const pagePage = new PagePage(
    page,
    path,
    logStep,
    screenshotsDir,
    screenshots
  );

  try {
    // Given
    await loginPage.open(url);

    await loginPage.login("test@test.com", "Test@test25");

    // When
    await pagePage.openPages("text5", "image5");
    await pagePage.openNewPage();

    // And
    await pagePage.fillPageForm('test-page-title');
    await page.keyboard.press("Enter");


    // And
    await pagePage.publishPage("text8", "image8");

    // And
    await pagePage.confirmPublish("text9", "image9");

    // And
    await pagePage.returnToPages("text10", "image10");

    // And
    await pagePage.openPages("text11", "image11");

    // Then
    await page.waitForSelector("h3.gh-content-entry-title");

    const newTagCreated = await page.evaluate(() => {
      const elements = document.querySelectorAll('h3.gh-content-entry-title');
      for (let i = 0; i < elements.length; i++) {
        if (elements[i].textContent.trim() === 'test-page-title') {
          return true;
        }
      }
      return false;
    });


    if (newTagCreated) {
      await logStep(
        screenshots.text12_1,
        path.join(screenshotsDir, screenshots.image12_1)
      );
    } else {
      await logStep(
        screenshots.text12_2,
        path.join(screenshotsDir, screenshots.image12_2)
      );
    }
  } catch (error) {
    await logStep(
      `Error inesperado:\n${error}`,
      path.join(screenshotsDir, "500_ERROR.png")
    );
  } finally {
    await adminPage.logOut("text13", "image13");

    await logStep(
      screenshots.text14,
      path.join(screenshotsDir, screenshots.image14)
    );

    await browser.close();
  }
}
module.exports = testNewPage;
