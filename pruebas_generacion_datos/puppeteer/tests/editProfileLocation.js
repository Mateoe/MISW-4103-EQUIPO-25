const path = require("path");
const LoginPage = require("../pages/login");
const initialSettings = require("../config/initialSettings");
const AdminPage = require("../pages/admin");
const ProfilePage = require("../pages/profile");
const faker = require("faker");

async function testEditProfileLocation(
  testName,
  serviceUrl,
  folderName,
  location
) {
  console.log(testName);
  const url = serviceUrl;
  const { page, logStep, screenshotsDir, browser } =
    await initialSettings(folderName);

  const screenshots = {
    text1: "Ingreso a pagina de ajustes",
    image1: "01_openProfileSettings.png",
    text2: "Editar la ubicación de perfil",
    image2: "02_editProfileLocation.png",
    text3: "Guardar cambios",
    image3: "03_saveChanges.png",
    text4: "Ubicación editado exitosamente",
    image4: "04_editLocationSuccess.png",
    text5: "No se cambio la Ubicación",
    image5: "04_editLocationError.png",
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
    await profilePage.fillProfileLocation(location);

    await logStep(
      screenshots.text2,
      path.join(screenshotsDir, screenshots.image2)
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
      (html, location) => {
        return html.includes(location);
      },
      htmlContent,
      location
    );

    if (NameUpdated) {
      await logStep(
        screenshots.text4,
        path.join(screenshotsDir, screenshots.image4)
      );
    } else {
      await logStep(
        screenshots.text5,
        path.join(screenshotsDir, screenshots.image5)
      );
    }
  } catch (error) {
    await logStep(
      `Error inesperado:\n${error}`,
      path.join(screenshotsDir, "500_ERROR.png")
    );
  } finally {
    await browser.close();
  }
}
module.exports = testEditProfileLocation;
