const path = require("path");
const LoginPage = require("../pages/login");
const initialSettings = require("../config/initialSettings");
const AdminPage = require("../pages/admin");
const ProfilePage = require("../pages/profile");
const faker = require("faker");

async function testEditProfileName() {
  console.log("REALIZANDO PRUEBA E2E DE EDITAR EL NOMBRE DE PERFIL");
  const url = "https://ghost-5ehz.onrender.com/ghost/#/signin";
  const { page, logStep, screenshotsDir, browser } =
    await initialSettings("EditProfileName");
  const loginPage = new LoginPage(page);
  const adminPage = new AdminPage(page);
  const profilePage = new ProfilePage(page);

  try {
    // Given
    await loginPage.open(url);
    await logStep(
      "Navegación a la página de inicio de sesión",
      path.join(screenshotsDir, "01_pageLogin.png")
    );

    await loginPage.login("test@test.com", "Test@test25");
    await logStep(
      "Iniciando sesión",
      path.join(screenshotsDir, "02_login.png")
    );

    await page.waitForSelector('a[data-test-nav="settings"]');
    await logStep(
      "Inicio de sesión exitoso",
      path.join(screenshotsDir, "03_loginSuccess.png")
    );

    // When
    await profilePage.openProfileFromMain();
    await logStep(
      "Ingreso a pagina de ajustes",
      path.join(screenshotsDir, "04_openSettings.png")
    );

    // And
    random_name = faker.name.findName();
    await profilePage.fillPorfileName(random_name);
    await logStep(
      "Ingreso al formulario de creacion de oferta",
      path.join(screenshotsDir, "05_NewOfferInterface.png")
    );

    // And
    await profilePage.saveProfile();
    await logStep(
      "Llenado de formulario creacion de oferta",
      path.join(screenshotsDir, "06_fillNewOfferForm.png")
    );

    // Then
    await profilePage.openProfileFromSetting();
    await logStep(
      "Ingreso al formulario",
      path.join(screenshotsDir, "07_openProfileFromSetting.png")
    );

    await page.waitForSelector("h1.break-words");

    const nameElement = await page.waitForSelector("h1.break-words");

    const htmlContent = await page.evaluate(
      (element) => element.outerHTML,
      nameElement
    );

    const NameUpdated = await page.evaluate(
      (html, random_name) => {
        return html.includes(random_name);
      },
      htmlContent,
      random_name
    );

    if (NameUpdated) {
      await logStep(
        "Nuevo nombre creado exitosamente",
        path.join(screenshotsDir, "07_NewOfferSuccess.png")
      );
    } else {
      await logStep(
        "No se cambio el Nombre",
        path.join(screenshotsDir, "07_NewOfferError.png")
      );
    }

    await profilePage.saveProfile();
    await logStep(
      "Cerrar formulario de creacion de oferta",
      path.join(screenshotsDir, "06_fillNewOfferForm.png")
    );

    await adminPage.closeSettings();
  } catch (error) {
    await logStep(
      `Error inesperado:\n${error}`,
      path.join(screenshotsDir, "500_ERROR.png")
    );
  } finally {
    await adminPage.logOut();

    await logStep(
      "Se cierra sesión",
      path.join(screenshotsDir, "09_logOut.png")
    );
    await browser.close();
  }
}
module.exports = testEditProfileName;
