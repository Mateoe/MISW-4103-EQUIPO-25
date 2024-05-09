const path = require("path");
const LoginPage = require("../pages/login");
const initialSettings = require("../config/initialSettings");
const AdminPage = require("../pages/admin");
const ProfilePage = require("../pages/profile");
const faker = require("faker");

async function testEditProfileLocation() {
  console.log("REALIZANDO PRUEBA E2E DE EDITAR la ubicación de perfil");
  const url = "https://ghost-5ehz.onrender.com/ghost/#/signin";
  const { page, logStep, screenshotsDir, browser } = await initialSettings(
    "EditProfileLocation"
  );
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
    const randomCity = faker.address.city();

    await profilePage.fillProfileLocation(randomCity);
    await logStep(
      "Ingreso al formulario de creacion de ciudad",
      path.join(screenshotsDir, "05_NewOfferInterface.png")
    );

    // And
    await profilePage.saveProfile();
    await logStep(
      "Gudardar los cambios",
      path.join(screenshotsDir, "06_fillNewOfferForm.png")
    );

    // Then
    await profilePage.openProfileFromSetting();

    await logStep(
      "Ingreso al formulario",
      path.join(screenshotsDir, "07_openProfileFromSetting.png")
    );

    await page.waitForSelector("h1.break-words");

    const idValue = await page.evaluate(() => {
      const labelElements = document.querySelectorAll("label");
      let idValue = "";
      labelElements.forEach((label) => {
        if (label.innerText.trim() === "Location") {
          idValue = label.getAttribute("for");
        }
      });
      return idValue;
    });

    let selectorName = "#" + idValue.replace(/:/g, "\\:");

    const nameElement = await page.$(selectorName);

    const htmlContent = await page.evaluate(
      (element) => element.outerHTML,
      nameElement
    );

    const NameUpdated = await page.evaluate(
      (html, randomCity) => {
        return html.includes(randomCity);
      },
      htmlContent,
      randomCity
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
module.exports = testEditProfileLocation;
