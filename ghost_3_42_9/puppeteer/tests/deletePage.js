const path = require("path");
const LoginPage = require("../pages/login");
const initialSettings = require("../config/initialSettings");
const AdminPage = require("../pages/admin");
const PagePage = require("../pages/pages");

async function testDeletePage() {
    console.log("REALIZANDO PRUEBA E2E DE ELIMINAR UNA PAGINA");
    const url = "http://localhost:2368/ghost/#/pages";
    const { page, logStep, screenshotsDir, browser } = await initialSettings("GHOST_3_deletePage");

    const screenshots = {
        text1: "Navegación a la página de inicio de sesión",
        image1: "01_pageLogin.png",
        text2: "Ingresar el usuario",
        image2: "02_userName.png",
        text3: "Ingresar el la contraseña",
        image3: "03_password.png",
        text4: "Inicio de sesión exitoso",
        image4: "04_loginSuccess.png",
        text5: "Ingreso a la interfaz de pages",
        image5: "05_Pages.png",
        text6: "Ingreso al formulario de edición de pages",
        image6: "06_editPage.png",
        text7: "Ingreso a las configuraciones de page",
        image7: "07_configPage.png",
        text8: "Presiono eliminar page",
        image8: "08_deletePage.png",
        text9: "Presiono confirmar eliminar page",
        image9: "09_confirmDeletePage.png",
        text10: "Page eliminada correctamente",
        image10: "10_successDeltePage.png",
        text11: "Page no eliminada",
        image11: "10_errorDeltePage.png",
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
    const pagePage = new PagePage(
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
        await pagePage.openPages("text5", "image5");
        await pagePage.openEditPage('test-page-title');
        // And
        await pagePage.deletePage()

        //Then
        const tagPresent = await page.evaluate(() => {
            const deletedTag = 'test-page-title';
            const tagElements = Array.from(document.querySelectorAll('.gh-content-entry-title'));
            return tagElements.some(tag => tag.innerText.trim() === deletedTag);
        });

        if (!tagPresent) {
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
        await logStep(
            `Error inesperado:\n${error}`,
            path.join(screenshotsDir, "500_ERROR.png")
        );
    } finally {
        await adminPage.logOut("text12", "image12");

        await logStep(
            screenshots.text13,
            path.join(screenshotsDir, screenshots.image13)
        );

        await browser.close();
    }
}
module.exports = testDeletePage;
