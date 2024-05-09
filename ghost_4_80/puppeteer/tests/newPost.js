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
    await initialSettings("newPost");
  const loginPage = new LoginPage(page);
  const adminPage = new AdminPage(page);
  const postPage = new PostPage(page);

  try {
    // Given
    await loginPage.open(url);
    await logStep(
      "Navegación a la página de inicio de sesión",
      path.join(screenshotsDir, "01_pageLogin.png")
    );

    await loginPage.login("test@test.com", "Test@test25");
    await logStep(
      "Iniciando sesión",
      path.join(screenshotsDir, "02_login.png")
    );

    await page.waitForSelector('a[data-test-nav="posts"]');
    await logStep(
      "Inicio de sesión exitoso",
      path.join(screenshotsDir, "03_loginSuccess.png")
    );


    // When
    await postPage.openNewPost();
    await logStep(
      "Ingreso al formulario de creacion de posts",
      path.join(screenshotsDir, "04_newPostInterface.png")
    );

    const title = faker.name.title();
    console.log("title:", title);
    await postPage.fillPostForm(title);
    await logStep(
      "Llenado de formulario creacion de posts",
      path.join(screenshotsDir, "05_fillNewPostForm.png")
    );
    // And
    await postPage.publishPost();
    await logStep(
      "Publicación de post",
      path.join(screenshotsDir, "06_publishPost.png")
    );

    // And
    await postPage.finalReview();
    await logStep(
      "Revisión final de post",
      path.join(screenshotsDir, "07_finalReview.png")
    );

    // And
    await postPage.confirmPublish();
    await logStep(
      "Confirmación de publicación",
      path.join(screenshotsDir, "08_confirmPublish.png")
    );

    //And
    await postPage.publishedPostSusccessfully();
    await logStep(
      "Post creado exitosamente",
      path.join(screenshotsDir, "09_newPostSuccess.png")
    );

    await postPage.returnToPosts();
    await logStep(
      "Retornar a pagina de posts",
      path.join(screenshotsDir, "10_returnToPosts.png")
    );

    await postPage.openPosts();

    // Then
    const postNameElement = await page.waitForSelector('h3.gh-content-entry-title');
    const postName = await page.evaluate(postNameElement => postNameElement.textContent.trim(), postNameElement);
    if (postName === title) {
        await logStep("Nuevo post creado exitosamente", path.join(screenshotsDir, "11_newpostSuccess.png"));
    } else {
        await logStep("No se creó el post", path.join(screenshotsDir, "11_newpostError.png"));
    }

  } catch (error) {
    await logStep(
      `Error inesperado:\n${error}`,
      path.join(screenshotsDir, "500_ERROR.png")
    );
  } finally {
    await adminPage.logOut();

    await logStep(
      "Se cierra sesión",
      path.join(screenshotsDir, "12_logOut.png")
    );
    await browser.close();
  }
}
module.exports = testNewPost;
