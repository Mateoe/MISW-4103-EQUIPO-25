const path = require("path");
const LoginPage = require("../pages/login");
const initialSettings = require("../config/initialSettings");
const AdminPage = require("../pages/admin");
const MembersPage = require("../pages/members");

async function testNewMember(testName, serviceUrl, folderName, name, email, labels, note, width, height) {
    console.log(testName)
    const url = serviceUrl;
    const { page, logStep, screenshotsDir, browser } = await initialSettings(folderName, width, height);

    const screenshots = {
        text1: "Ingresar a la página de miembros",
        image1: "01_members_interface.png",
        text2: "Ingresar al formulario de miembros",
        image2: "02_openMembersForm.png",
        text3:  "Ingresa nombre del miembro",
        image3: "03_inputMemberName.png",
        text4:  "Ingresa el email del miembro",
        image4: "04_inputMemberEmail.png",
        text5:  "Ingresa el label del miembro",
        image5: "05_inputMemberLabel.png",
        text6:  "Ingresa la nota del miembro",
        image6: "06_inputMembeNote.png",
        text7: "Guardar miembro",
        image7: "07_saveNewMember.png",
        text8: "Miembro creado exitosamente",
        image8: "08_successNewMember.png",
        text9: "Miembro no creado",
        image9: "08_errorNewMember.png",
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
    const membersPage = new MembersPage(page,
        path,
        logStep,
        screenshotsDir,
        screenshots
    );

    try {

        // Given
        await loginPage.open(url);

        await loginPage.login("test@test.com", "Test@test25");

        await page.waitForSelector('a[data-test-nav="members"]');

        await adminPage.openMembers()

        // When
        await membersPage.openNewMember()
        // And
        await membersPage.newMember(name, email, labels, note)

        // Then
        const newMemberCreated = await page.evaluate(() => {
            const element = document.querySelector('[data-test-task-button-state="success"]');
            return element !== null;
        });
        
        if (newMemberCreated) {
            await logStep(
                screenshots.text8,
                path.join(screenshotsDir, screenshots.image8)
            );
      
        } else {
            await logStep(
                screenshots.text9,
                path.join(screenshotsDir, screenshots.image9)
            );
        }
    } catch (error) {
        await logStep(`Error inesperado:\n${error}`, path.join(screenshotsDir, "500_ERROR.png"));
    } finally {

        await browser.close();
    }
}
module.exports = testNewMember;
