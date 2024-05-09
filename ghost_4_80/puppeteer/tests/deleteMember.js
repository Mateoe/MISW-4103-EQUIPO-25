const path = require("path");
const LoginPage = require("../pages/login");
const initialSettings = require("../config/initialSettings");
const AdminPage = require("../pages/admin");
const MembersPage = require("../pages/members");

async function testDeleteMember() {
    console.log("REALIZANDO PRUEBA E2E DE ELIMINACIÓN DE MIEMBROS")
    const url = "https://ghost-5ehz.onrender.com/ghost/#/signin";
    const { page, logStep, screenshotsDir, browser } = await initialSettings("deleteMember");
    const loginPage = new LoginPage(page);
    const adminPage = new AdminPage(page)
    const membersPage = new MembersPage(page);

    try {

        // Given
        await loginPage.open(url);
        await logStep("Navegación a la página de inicio de sesión", path.join(screenshotsDir, "01_pageLogin.png"));

        await loginPage.login("test@test.com", "Test@test25");
        await logStep("Iniciando sesión", path.join(screenshotsDir, "02_login.png"));

        await page.waitForSelector('a[data-test-nav="members"]');
        await logStep("Inicio de sesión exitoso", path.join(screenshotsDir, "03_loginSuccess.png"));

        await adminPage.openMembers()
        await logStep("Ingreso a pagina de miembros", path.join(screenshotsDir, "04_openMembers.png"));

        // When
        await membersPage.openEditMember("test-name")
        await logStep("Ingreso al formulario de edición de miembros", path.join(screenshotsDir, "05_editMemberInterface.png"));
        // And
        await membersPage.deleteMember()
        await logStep("Eliminación de miembro", path.join(screenshotsDir, "06_fillNewMemberForm.png"));
        // And
        await page.waitForNavigation();
        await logStep("Retornar a pagina de miembros", path.join(screenshotsDir, "07_returnToMembers.png"));

        // Then
        try {
            await page.waitForSelector('h3.ma0.pa0.gh-members-list-name:has-text("test-name")', { timeout: 1000 });
            await logStep("Error: no se pudo eliminar el meimbro", path.join(screenshotsDir, "08_deletedMemberError.png"));
        } catch (error) {
            await logStep("Miembro eliminado exitosamente", path.join(screenshotsDir, "08_deletedMemberSuccess.png"));
        }
    } catch (error) {
        await logStep(`Error inesperado:\n${error}`, path.join(screenshotsDir, "500_ERROR.png"));
    } finally {
        await adminPage.logOut()
        await logStep("Se cierra sesión", path.join(screenshotsDir, "09_logOut.png"));
        await browser.close();
    }
}
module.exports = testDeleteMember;
