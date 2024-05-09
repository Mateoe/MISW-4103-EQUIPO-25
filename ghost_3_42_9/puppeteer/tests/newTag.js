const path = require("path");
const LoginPage = require("../pages/login");
const initialSettings = require("../config/initialSettings");
const AdminPage = require("../pages/admin");
const TagsPage = require("../pages/tags");

async function testNewTag() {
    console.log("REALIZANDO PRUEBA E2E DE CREACIÓN DE TAGS")
    const url = "https://ghost-5ehz.onrender.com/ghost/#/signin";
    const { page, logStep, screenshotsDir, browser } = await initialSettings("newTag");
    const loginPage = new LoginPage(page);
    const adminPage = new AdminPage(page)
    const tagsPage = new TagsPage(page)

    try {

        // Given
        await loginPage.open(url);
        await logStep("Navegación a la página de inicio de sesión", path.join(screenshotsDir, "01_pageLogin.png"));

        await loginPage.login("test@test.com", "Test@test25");
        await logStep("Iniciando sesión", path.join(screenshotsDir, "02_login.png"));

        await page.waitForSelector('a[data-test-nav="tags"]');
        await logStep("Inicio de sesión exitoso", path.join(screenshotsDir, "03_loginSuccess.png"));

        await adminPage.openTags()
        await logStep("Ingreso a pagina de tags", path.join(screenshotsDir, "04_openTags.png"));

        // When
        await tagsPage.openNewTag()
        await logStep("Ingreso al formulario de creacion de tags", path.join(screenshotsDir, "05_newTagInterface.png"));
        // And
        await tagsPage.newTag("test-name", "test-slug", "test-description")
        await logStep("Llenado de formulario creacion de tags", path.join(screenshotsDir, "06_fillNewTagForm.png"));
        // And
        await adminPage.openTags()
        await logStep("Retornar a pagina de tags", path.join(screenshotsDir, "07_returnToTags.png"));

        // Then
        const tagNameElement = await page.waitForSelector('h3.gh-tag-list-name[data-test-tag-name=""]');
        const tagName = await page.evaluate(tagNameElement => tagNameElement.textContent.trim(), tagNameElement);
        if (tagName === "test-name") {
            await logStep("Nuevo tag creado exitosamente", path.join(screenshotsDir, "08_newTagSuccess.png"));
        } else {
            await logStep("No se creó el tag", path.join(screenshotsDir, "08_newTagError.png"));
        }
    } catch (error) {
        await logStep(`Error inesperado:\n${error}`, path.join(screenshotsDir, "500_ERROR.png"));
    } finally {
        await adminPage.logOut()
        await logStep("Se cierra sesión", path.join(screenshotsDir, "09_logOut.png"));
        await browser.close();
    }
}
module.exports = testNewTag;
