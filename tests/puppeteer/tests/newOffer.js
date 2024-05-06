const path = require("path");
const LoginPage = require("../pages/login");
const initialSettings = require("../config/initialSettings");
const AdminPage = require("../pages/admin");
const OfferPage = require("../pages/offers");
const faker = require("faker");

async function testNewOffer() {
  console.log("REALIZANDO PRUEBA E2E DE CREACIÓN DE OFERTA ");
  const url = "https://ghost-5ehz.onrender.com/ghost/#/signin";
  const { page, logStep, screenshotsDir, browser } =
    await initialSettings("NewOffer");
  const loginPage = new LoginPage(page);
  const adminPage = new AdminPage(page);
  const offerPage = new OfferPage(page);

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
    await offerPage.openNewOffer();
    await logStep(
      "Ingreso al formulario de creacion de oferta",
      path.join(screenshotsDir, "05_NewOfferInterface.png")
    );

    // And
    const discountName = faker.random.word();
    const discountCompleteName = `Descuento ${discountName}`;
    console.log("discountName:", discountCompleteName);

    // And
    await offerPage.fillOfferForm(discountCompleteName);
    await logStep(
      "Llenado de formulario creacion de oferta",
      path.join(screenshotsDir, "06_fillNewOfferForm.png")
    );

    // And
    await offerPage.saveOffer();
    await logStep(
      "Guardar oferta",
      path.join(screenshotsDir, "07_SaveOffer.png")
    );

    // And
    await offerPage.publishOffer();
    await logStep(
      "Publicación de oferta",
      path.join(screenshotsDir, "08_PublishOffer.png")
    );

    // And
    await offerPage.openOffers();
    await logStep(
      "Ingreso a ofertas",
      path.join(screenshotsDir, "05_Offers.png")
    );

    // Then
    await page.waitForSelector("a.block.cursor-pointer.p-5.pl-0");
    const offerNameElement = await page.waitForSelector(
      "a.block.cursor-pointer.p-5.pl-0"
    );
    const htmlContent = await page.evaluate(
      (element) => element.outerHTML,
      offerNameElement
    );
    const offerExist = await page.evaluate(
      (html, discountCompleteName) => {
        return html.includes(discountCompleteName);
      },
      htmlContent,
      discountCompleteName
    );

    if (offerExist) {
      await logStep(
        "Nuevo Offer creado exitosamente",
        path.join(screenshotsDir, "07_NewOfferSuccess.png")
      );
    } else {
      await logStep(
        "No se creó el Offer",
        path.join(screenshotsDir, "07_NewOfferError.png")
      );
    }

    await page.goBack();

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
module.exports = testNewOffer;
