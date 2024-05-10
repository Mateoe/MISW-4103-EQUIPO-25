const path = require("path");
const LoginPage = require("../pages/login");
const initialSettings = require("../config/initialSettings");
const AdminPage = require("../pages/admin");
const TagsPage = require("../pages/tags");

async function testNewTag() {
    console.log("REALIZANDO PRUEBA E2E DE CREACIÓN DE TAGS")
    const url = "http://localhost:2368/ghost/#/signin";
    const { page, logStep, screenshotsDir, browser } = await initialSettings(
        "GHOST_3_newTag"
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
        text7:  "Ingresa información al formulario de creación del tag",
        image7: "07_newTag.png",
        text8: "Guardar tag creado",
        image8: "08_saveNewTag.png",
        text9: "Confirmar tag creado",
        image9: "09_confirmNewTag.png",
        text10: "Tag creado exitosamente",
        image10: "10_successNewTag.png",
        text11: "Tag no creado",
        image11: "10_errorNewTag.png",
        text12: "Abrir Dropdown Menu",
        image12: "11_dropdownMenu.png",
        text13: "Se cierra sesión",
        image13: "12_logOut.png",
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
        await tagsPage.openNewTag()
        // And
        await tagsPage.newTag("test-name", "test-slug", "test-description")
        // And
        await adminPage.openTags()
        await logStep(
            screenshots.text9,
            path.join(screenshotsDir, screenshots.image9)
        );

        // Then
        const newTagCreated = await page.evaluate(() => {
            const elements = document.querySelectorAll('h3.gh-tag-list-name');
            for (let i = 0; i < elements.length; i++) {
                if (elements[i].textContent.trim() === 'test-name') {
                    return true;
                }
            }
            return false;
        });
        
        if (newTagCreated) {
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
module.exports = testNewTag;
