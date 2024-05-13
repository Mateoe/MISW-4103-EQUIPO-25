const path = require("path");
const LoginPage = require("../pages/login");
const initialSettings = require("../config/initialSettings");
const AdminPage = require("../pages/admin");
const MembersPage = require("../pages/members");

async function testNewMember() {
    console.log("REALIZANDO PRUEBA E2E DE CREACIÓN DE MIEMBROS")
    const url = "https://ghost-5ehz.onrender.com/ghost/#/signin";
    const { page, logStep, screenshotsDir, browser } = await initialSettings("newMember");
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
        await membersPage.openNewMember()
        await logStep("Ingreso al formulario de creacion de miembros", path.join(screenshotsDir, "05_newMemberInterface.png"));
        // And
        await membersPage.newMember("test-name", "test@email.com")
        await logStep("Llenado de formulario creacion de miembro", path.join(screenshotsDir, "06_fillNewMemberForm.png"));
        // And
        await adminPage.logOut()
        await logStep("Se cierra sesión", path.join(screenshotsDir, "07_logOut.png"));

        await loginPage.login("test@test.com", "Test@test25");
        await logStep("Iniciando sesión", path.join(screenshotsDir, "08_login.png"));

        await page.waitForSelector('a[data-test-nav="members"]');
        await logStep("Inicio de sesión exitoso", path.join(screenshotsDir, "09_loginSuccess.png"));

        await adminPage.openMembers()
        await logStep("Ingreso a pagina de miembros", path.join(screenshotsDir, "10_openMembers.png"));

        //Then
        const memberNameElement = await page.waitForSelector('h3.ma0.pa0.gh-members-list-name');
        const memberName = await page.evaluate(tagNameElement => tagNameElement.textContent.trim(), memberNameElement);
        if (memberName === "test-name") {
            await logStep("Nuevo miembro creado exitosamente", path.join(screenshotsDir, "11_newMemberSuccess.png"));
        } else {
            await logStep("No se creó el miembro", path.join(screenshotsDir, "11_newMemberError.png"));
        }
    } catch (error) {
        await logStep(`Error inesperado:\n${error}`, path.join(screenshotsDir, "500_ERROR.png"));
    } finally {
        await adminPage.logOut()
        await logStep("Se cierra sesión", path.join(screenshotsDir, "12_logOut.png"));
        await browser.close();
    }
}
module.exports = testNewMember;
