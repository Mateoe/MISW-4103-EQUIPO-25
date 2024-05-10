const path = require("path");
const LoginPage = require("../pages/login");
const initialSettings = require("../config/initialSettings");
const AdminPage = require("../pages/admin");
const TagsPage = require("../pages/tags");

async function testEditTag() {
    console.log("REALIZANDO PRUEBA E2E DE EDICIÓN DE TAGS")
    const url = "https://ghost-5ehz.onrender.com/ghost/#/signin";
    const { page, logStep, screenshotsDir, browser } = await initialSettings(
        "GHOST_4_EditTag"
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
        text5: "Ingresar a la página de tags",
        image5: "05_tags_interface.png",
        text6: "Ingresar al formulario de tags",
        image6: "06_openTagsForm.png",
        text7: "Editar el tag",
        image7: "07_editTag.png",
        text8: "Guardar tag editado",
        image8: "08_saveEditedTag.png",
        text9: "Confirmar tag editado",
        image9: "09_confirmEditedTag.png",
        text10: "Tag editado exitosamente",
        image10: "10_successEditedTag.png",
        text11: "Tag no editado",
        image11: "10_errorEditedTag.png",
        text12: "Abrir Dropdown Menu",
        image12: "12_dropdownMenu.png",
        text13: "Se cierra sesión",
        image13: "13_logOut.png",
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
    const tagsPage = new TagsPage(
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

        await page.waitForSelector('a[href="#/tags/"]');

        await adminPage.openTags()

        // When
        await tagsPage.openEditTag('test-name')
        // And
        await tagsPage.editTagSlug("edited-tag-slug")
        // And
        await adminPage.openTags()
        await page.waitForSelector('h3.gh-tag-list-name');
        await logStep(
            screenshots.text9,
            path.join(screenshotsDir, screenshots.image9)
        );
        // Then
        const tagSlugElement = await page.waitForSelector('a[href="#/tags/edited-tag-slug/"] span');
        const tagSlug = await page.evaluate(tagSlugElement => tagSlugElement.textContent.trim(), tagSlugElement);
        if (tagSlug === "edited-tag-slug") {
            await logStep(
                screenshots.text10,
                path.join(screenshotsDir, screenshots.image10)
            );
        } else {
            await logStep(
                screenshots.text11,
                path.join(screenshotsDir, screenshots.image11)
            );
        }
    } catch (error) {
        await logStep(`Error inesperado:\n${error}`, path.join(screenshotsDir, "500_ERROR.png"));
    } finally {
        await adminPage.logOut("text12", "image12")
        await logStep(
            screenshots.text13,
            path.join(screenshotsDir, screenshots.image13)
        );
        await browser.close();
    }
}
module.exports = testEditTag;
