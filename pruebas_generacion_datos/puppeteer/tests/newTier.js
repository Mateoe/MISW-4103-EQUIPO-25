const path = require("path");
const LoginPage = require("../pages/login");
const initialSettings = require("../config/initialSettings");
const AdminPage = require("../pages/admin");
const TierPage = require("../pages/tiers");

async function testNewTier(
  testName,
  serviceUrl,
  folderName,
  subscriptionCompleteType,
  priceMonth,
  priceAnual
) {
  console.log(testName);
  const url = serviceUrl;
  const { page, logStep, screenshotsDir, browser } =
    await initialSettings(folderName);

  const screenshots = {
    text1: "Ingreso al formulario de creacion de membresía",
    image1: "01_newTierInterface.png",
    text2: "Llenado de formulario creacion de membresía",
    image2: "02_fillNewTierForm.png",
    text3: "Guardar membresía",
    image3: "03_SaveTier.png",
    text4: "Membresía creada exitosamente",
    image4: "04_CreateTierSuccess.png",
    text5: "Membresía no se creada por error",
    image5: "04_Not_Created_tier_Success.png",
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
  const tierPage = new TierPage(
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

    await adminPage.openSettings();

    // When
    await tierPage.openNewTier();

    // And
    await tierPage.newTier(subscriptionCompleteType, priceMonth, priceAnual);

    // then
    await tierPage.saveTier();

    await new Promise((r) => setTimeout(r, 1000));

    if (
      folderName.includes("blank") ||
      folderName.includes("empty") ||
      folderName.includes("error")
    ) {
      await page.waitForSelector("div.flex.items-start.gap-3");

      await logStep(
        screenshots.text5,
        path.join(screenshotsDir, screenshots.image5)
      );
    } else {
      await logStep(
        screenshots.text4,
        path.join(screenshotsDir, screenshots.image4)
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
module.exports = testNewTier;
