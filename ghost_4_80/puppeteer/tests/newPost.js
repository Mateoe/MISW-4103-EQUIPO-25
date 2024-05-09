const path = require("path");
const LoginPage = require("../pages/login");
const initialSettings = require("../config/initialSettings");
const AdminPage = require("../pages/admin");
const PostPage = require("../pages/posts");
const faker = require("faker");

async function testNewPost() {
  console.log("REALIZANDO PRUEBA E2E DE CREAR UN POST");
  const url = "https://ghost-5ehz.onrender.com/ghost/#/signin";
  const { page, logStep, screenshotsDir, browser } =
    await initialSettings("GHOST_4_newPost");

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
    text7: "Publicación de post",
    image7: "07_publishPost.png",
    text8: "Confirmación de publicación de post",
    image8: "08_confirmPublish.png",
    text9: "Retornar a pagina de posts",
    image9: "09_returnToPosts.png",
    text10: "Abrir listado de posts",
    image10: "10_openPosts.png",
    text11_1: "Nuevo post creado exitosamente",
    image11_1: "11_newpostSuccess.png",
    text11_2: "No se creó el post",
    image11_2: "11_newpostError.png",
    text12: "Abrix Dropdown Menu",
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
    await postPage.publishPost();

    // And
    await postPage.finalReview();

    // And
    await postPage.confirmPublish();

    //And
    await postPage.publishedPostSusccessfully();

    await postPage.returnToPosts();

    await postPage.openPosts();

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
        screenshots.text11_1,
        path.join(screenshotsDir, screenshots.image11_1)
      );
    } else {
      await logStep(
        screenshots.text11_2,
        path.join(screenshotsDir, screenshots.image11_2)
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
module.exports = testNewPost;
