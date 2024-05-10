const path = require("path");
const LoginPage = require("../pages/login");
const initialSettings = require("../config/initialSettings");
const AdminPage = require("../pages/admin");
const TagsPage = require("../pages/tags");

async function testDeleteTag() {

    console.log("REALIZANDO PRUEBA E2E DE ELIMINACIÓN DE TAGS")
    const url = "http://localhost:2368/ghost/#/tags";
    const { page, logStep, screenshotsDir, browser } = await initialSettings(
        "GHOST_3_DeleteTag"
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
        text7: "Click en eliminar tag",
        image7: "07_deleteTag.png",
        text8: "Click en confirmar",
        image8: "08_confirmDelete.png",
        text9: "Confirmar tag eliminado",
        image9: "09_confirmDeltedTag.png",
        text10: "Tag eliminado exitosamente",
        image10: "10_successDeltedTag.png",
        text11: "Tag no eliminado",
        image11: "10_errorDeltedTag.png",
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
        await tagsPage.deleteTag()
        // And
        await page.waitForSelector('section.content-list');
        await logStep(
            screenshots.text9,
            path.join(screenshotsDir, screenshots.image9)
        );

        // Then

        const tagPresent = await page.evaluate(() => {
            const deletedTag = 'test-name'; // Nombre de la etiqueta que esperas haber eliminado
            const tagElements = Array.from(document.querySelectorAll('.gh-tag-list-title'));
            return tagElements.some(tag => tag.innerText.trim() === deletedTag);
        });

        if (!tagPresent) {
            await logStep(
                screenshots.text10,
                path.join(screenshotsDir, screenshots.image10)
            );
        } else {
            console.log(error);
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
module.exports = testDeleteTag;
