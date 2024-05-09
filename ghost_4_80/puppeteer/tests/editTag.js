const path = require("path");
const LoginPage = require("../pages/login");
const initialSettings = require("../config/initialSettings");
const AdminPage = require("../pages/admin");
const TagsPage = require("../pages/tags");

async function testEditTag() {
    console.log("REALIZANDO PRUEBA E2E DE EDICIÓN DE TAGS")
    const url = "https://ghost-5ehz.onrender.com/ghost/#/signin";
    const { page, logStep, screenshotsDir, browser } = await initialSettings("editTag");
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
        await tagsPage.openEditTag('test-name')
        await logStep("Ingreso al formulario de edición de tags", path.join(screenshotsDir, "05_editTag.png"));
        // And
        await tagsPage.editTagSlug("edited-tag-slug")
        await logStep("Llenado de formulario creacion de tags", path.join(screenshotsDir, "06_editedTagSlug.png"));
        // And
        await adminPage.openTags()
        await page.waitForSelector('h3[data-test-tag-name]');
        await logStep("Retornar a pagina de tags", path.join(screenshotsDir, "07_returnToTags.png"));

        // Then
        const tagSlugElement = await page.waitForSelector('a[data-test-tag-slug] span');
        const tagSlug = await page.evaluate(tagSlugElement => tagSlugElement.textContent.trim(), tagSlugElement);
        if (tagSlug === "edited-tag-slug") {
            await logStep("El tag slug se ha editado correctamente", path.join(screenshotsDir, "08_editedTagSlugSuccess.png"));
        } else {
            await logStep("Error al editar el tag slug", path.join(screenshotsDir, "08_editedTagSlugError.png"));
        }
    } catch (error) {
        await logStep(`Error inesperado:\n${error}`, path.join(screenshotsDir, "500_ERROR.png"));
    } finally {
        await adminPage.logOut()
        await logStep("Se cierra sesión", path.join(screenshotsDir, "09_logOut.png"));
        await browser.close();
    }
}
module.exports = testEditTag;
