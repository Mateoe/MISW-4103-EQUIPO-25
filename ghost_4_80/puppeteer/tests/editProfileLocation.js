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
    "GHOST_4_EditProfileLocation"
  );

  const screenshots = {
    text1: "Navegación a la página de inicio de sesión",
    image1: "01_pageLogin.png",
    text2: "Ingresar el usuario",
    image2: "02_userName.png",
    text3: "Ingresar el la contraseña",
    image3: "03_password.png",
    text4: "Inicio de sesión exitoso",
    image4: "04_loginSuccess.png",
    text5: "Abrix Dropdown Menu",
    image5: "05_dropdownMenu.png",
    text6: "Ingreso a pagina de ajustes",
    image6: "06_openProfileSettings.png",
    text7: "Editar la ubicación de perfil",
    image7: "07_editProfileLocation.png",
    text8: "Guardar cambios",
    image8: "08_saveChanges.png",
    text9_1: "Ubicación editado exitosamente",
    image9_1: "09_editLocationSuccess.png",
    text9_2: "No se cambio la Ubicación",
    image9_2: "09_editLocationError.png",
    text10: "Abrix Dropdown Menu",
    image10: "10_dropdownMenu.png",
    text11: "Se cierra sesión",
    image11: "11_logOut.png",
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
  const profilePage = new ProfilePage(
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
    await profilePage.openProfileFromMain();

    // And
    const randomCity = faker.address.city();
    await profilePage.fillProfileLocation(randomCity);

    
    await logStep(
      screenshots.text7,
      path.join(screenshotsDir, screenshots.image7)
    );

    // And
    await profilePage.saveProfile();

    // Then
    await profilePage.openProfileFromSetting();

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
        screenshots.text9_1,
        path.join(screenshotsDir, screenshots.image9_1)
      );
    } else {
      await logStep(
        screenshots.text9_2,
        path.join(screenshotsDir, screenshots.image9_2)
      );
    }

    await profilePage.saveProfile();

    await adminPage.closeSettings();
  } catch (error) {
    await logStep(
      `Error inesperado:\n${error}`,
      path.join(screenshotsDir, "500_ERROR.png")
    );
  } finally {
    await adminPage.logOut();

    await logStep(
      screenshots.text11,
      path.join(screenshotsDir, screenshots.image11)
    );

    await browser.close();
  }
}
module.exports = testEditProfileLocation;
