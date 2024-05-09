const path = require("path");
const LoginPage = require("../pages/login");
const initialSettings = require("../config/initialSettings");
const AdminPage = require("../pages/admin");
const PostPage = require("../pages/posts");
const faker = require("faker");

async function testNewPostWithTag() {
  console.log("REALIZANDO PRUEBA E2E DE CREAR UN POST CON UN TAG");
  const url = "https://ghost-5ehz.onrender.com/ghost/#/signin";
  const { page, logStep, screenshotsDir, browser } = await initialSettings(
    "GHOST_4_newPostWithTag"
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
    text5: "Ingreso al formulario de creacion de posts",
    image5: "05_newPostInterface.png",
    text6: "Se escribe el titulo del post",
    image6: "06_fillNewPostForm.png",
    text7: "Asignar tags",
    image7: "07_assignTags.png",
    text8: "Publicación de post",
    image8: "08_publishPost.png",
    text9: "Confirmación de publicación de post",
    image9: "09_confirmPublish.png",
    text10: "Retornar a pagina de posts",
    image10: "10_returnToPosts.png",
    text11: "Abrir listado de posts",
    image11: "11_openPosts.png",
    text12_1: "Nuevo post creado exitosamente",
    image12_1: "12_newpostSuccess.png",
    text12_2: "No se creó el post",
    image12_2: "12_newpostError.png",
    text13: "Abrix Dropdown Menu",
    image13: "13_dropdownMenu.png",
    text14: "Se cierra sesión",
    image14: "14_logOut.png",
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
  const postPage = new PostPage(
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
    await postPage.openNewPost();

    // And
    const title = faker.name.title();
    await postPage.fillPostForm(title);

    // And
    await postPage.assignTags("text7", "image7");

    // And
    await postPage.publishPost("text8", "image8");

    // And
    await postPage.finalReview();

    // And
    await postPage.confirmPublish("text9", "image9");

    //And
    await postPage.publishedPostSusccessfully();

    // And
    await postPage.returnToPosts("text10", "image10");

    // And
    await postPage.openPosts("text11", "image11");

    // Then
    const postNameElement = await page.waitForSelector(
      "h3.gh-content-entry-title"
    );
    const postName = await page.evaluate(
      (postNameElement) => postNameElement.textContent.trim(),
      postNameElement
    );
    if (postName === title) {
      await logStep(
        screenshots.text12_1,
        path.join(screenshotsDir, screenshots.image12_1)
      );
    } else {
      await logStep(
        screenshots.text12_2,
        path.join(screenshotsDir, screenshots.image12_2)
      );
    }
  } catch (error) {
    await logStep(
      `Error inesperado:\n${error}`,
      path.join(screenshotsDir, "500_ERROR.png")
    );
  } finally {
    await adminPage.logOut("text13", "image13");

    await logStep(
      screenshots.text14,
      path.join(screenshotsDir, screenshots.image14)
    );

    await browser.close();
  }
}
module.exports = testNewPostWithTag;
