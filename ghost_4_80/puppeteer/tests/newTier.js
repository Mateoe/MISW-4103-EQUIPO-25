const path = require("path");
const LoginPage = require("../pages/login");
const initialSettings = require("../config/initialSettings");
const AdminPage = require("../pages/admin");
const TierPage = require("../pages/tiers");
const faker = require("faker");

async function testNewTier() {
  console.log("REALIZANDO PRUEBA E2E DE CREACIÓN DE MEMBRESÍA");
  const url = "https://ghost-5ehz.onrender.com/ghost/#/signin";
  const { page, logStep, screenshotsDir, browser } =
    await initialSettings("newTier");
  const loginPage = new LoginPage(page);
  const adminPage = new AdminPage(page);
  const tierPage = new TierPage(page);

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

    await adminPage.openSettings();
    await logStep(
      "Ingreso a pagina de ajustes",
      path.join(screenshotsDir, "04_openSettings.png")
    );

    // When
    await tierPage.openNewTier();
    await logStep(
      "Ingreso al formulario de creacion de membresía",
      path.join(screenshotsDir, "05_newTierInterface.png")
    );

    // And
    const subscriptionType = faker.commerce.product();
    const subscriptionCompleteType = `Membresía ${subscriptionType}`;
    const description = "test-membership-description";
    const priceMonth = "5";
    const priceAnual = "48";
    const benefit = "Obtén acceso a todo el contenido web";

    await tierPage.newTier(
      subscriptionCompleteType,
      description,
      priceMonth,
      priceAnual,
      benefit
    );
    await logStep(
      "Llenado de formulario creacion de membresía",
      path.join(screenshotsDir, "06_fillNewTierForm.png")
    );

    // then
    await tierPage.saveTier();
    await logStep(
      "Guardar membresía",
      path.join(screenshotsDir, "07_SaveTier.png")
    );

    await adminPage.closeSettings();
    await logStep(
      "Retornar de ajustes",
      path.join(screenshotsDir, "08_returnToSettings.png")
    );
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
module.exports = testNewTier;
