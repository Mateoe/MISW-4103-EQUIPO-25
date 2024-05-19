const path = require("path");
const LoginPage = require("../pages/login");
const initialSettings = require("../config/initialSettings");
const AdminPage = require("../pages/admin");
const TagsPage = require("../pages/tags");

async function testNewTag(testName, serviceUrl, folderName, name, slug, description) {
    console.log(testName)
    const url = serviceUrl;
    const { page, logStep, screenshotsDir, browser } = await initialSettings(
        folderName
    );
    const screenshots = {
        text1: "Ingresar a la página de tags",
        image1: "01_tags_interface.png",
        text2: "Ingresar al formulario de tags",
        image2: "02_openTagsForm.png",
        text3:  "Ingresa nombre del tag",
        image3: "03_inputTagName.png",
        text4:  "Ingresa el slug del tag",
        image4: "04_inputTagSlug.png",
        text5:  "Ingresa la descripción del tag",
        image5: "05_inputTagDescription.png",
        text6: "Guardar tag",
        image6: "06_saveNewTag.png",
        text7: "Tag creado exitosamente",
        image7: "07_successNewTag.png",
        text8: "Tag no creado",
        image8: "07_errorNewTag.png",
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
        await tagsPage.newTag(name, slug, description)

        // Then
        const newTagCreated = await page.evaluate(() => {
            const element = document.querySelector('[data-test-task-button-state="success"]');
            return element !== null;
        });
        
        if (newTagCreated) {
            await logStep(
                screenshots.text7,
                path.join(screenshotsDir, screenshots.image7)
            );
        } else {
            await logStep(
                screenshots.text8,
                path.join(screenshotsDir, screenshots.image8)
            );
        }
          
    } catch (error) {
        await logStep(`Error inesperado:\n${error}`, path.join(screenshotsDir, "500_ERROR.png"));
    } finally {
        await browser.close();
    }
}
module.exports = testNewTag;
