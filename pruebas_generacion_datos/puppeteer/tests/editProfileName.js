const path = require("path");
const LoginPage = require("../pages/login");
const initialSettings = require("../config/initialSettings");
const AdminPage = require("../pages/admin");
const ProfilePage = require("../pages/profile");
const faker = require("faker");

async function testEditProfileName(testName, serviceUrl, folderName, name) {
  console.log(testName);
  const url = serviceUrl;
  const { page, logStep, screenshotsDir, browser } =
    await initialSettings(folderName);

  const screenshots = {
    text1: "Ingreso a pagina de ajustes",
    image1: "01_openProfileSettings.png",
    text2: "Editar nombre de perfil",
    image2: "02_editProfileName.png",
    text3: "Guardar cambios",
    image3: "03_saveChanges.png",
    text4: "Nombre editado exitosamente",
    image4: "04_editNameSuccess.png",
    text5: "No se cambio el Nombre por error",
    image5: "04_NotEditNameSuccess.png",
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
    await profilePage.fillPorfileName(name);

    await logStep(
      screenshots.text2,
      path.join(screenshotsDir, screenshots.image2)
    );

    // And
    await profilePage.saveProfile();

    // Then
    await profilePage.openProfileFromSetting();

    if (folderName.includes("error")) {

      await page.waitForSelector("div.flex.items-start.gap-3");


              await logStep(
                screenshots.text5,
                path.join(screenshotsDir, screenshots.image5)
              );
      
      
    } else {
      await page.waitForSelector("h1.break-words");

      const nameElement = await page.waitForSelector("h1.break-words");

      const htmlContent = await page.evaluate(
        (element) => element.outerHTML,
        nameElement
      );

      const NameUpdated = await page.evaluate(
        (html, name) => {
          return html.includes(name);
        },
        htmlContent,
        name
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
    }

    await profilePage.saveProfile();

    await adminPage.closeSettings();
  } catch (error) {
    await logStep(
      `Error inesperado:\n${error}`,
      path.join(screenshotsDir, "500_ERROR.png")
    );
  } finally {
    await browser.close();
  }
}
module.exports = testEditProfileName;
