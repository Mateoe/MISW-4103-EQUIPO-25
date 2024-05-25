const path = require("path");
const LoginPage = require("../pages/login");
const initialSettings = require("../config/initialSettings");
const AdminPage = require("../pages/admin");
const PostPage = require("../pages/posts");

async function testNewPost(testName, serviceUrl, folderName, title, width, height) {
  console.log(testName);
  const url = serviceUrl;
  const { page, logStep, screenshotsDir, browser } =
    await initialSettings(folderName, width, height);

  const screenshots = {
    text1: "Ingreso al formulario de creacion de posts",
    image1: "01_newPostInterface.png",

    text2: "Se escribe el titulo del post",
    image2: "02_fillNewPostForm.png",

    text3: "Publicación de post",
    image3: "03_publishPost.png",

    text4: "Confirmación de publicación de post",
    image4: "04_confirmPublish.png",

    text5: "Nuevo post creado exitosamente",
    image5: "5_newpostSuccess.png",

    text6: "No se creó el post Por error",
    image6: "5_NotNewpostSuccess.png",
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
    await postPage.fillPostForm(title);

    // And
    await postPage.publishPost("text3", "image3");

    // And
    await postPage.finalReview();

    // And
    await postPage.confirmPublish("text4", "image4");

    //And
    await postPage.publishedPostSusccessfully();

    // And
    await postPage.returnToPosts();

    // And
    await postPage.openPosts();

    await new Promise((r) => setTimeout(r, 1000));

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
        screenshots.text5,
        path.join(screenshotsDir, screenshots.image5)
      );
    } else {
      await logStep(
        screenshots.text6,
        path.join(screenshotsDir, screenshots.image6)
      );
    }
  } catch (error) {
    await logStep(
      screenshots.text6,
      path.join(screenshotsDir, screenshots.image6)
    );
  } finally {
    await browser.close();
  }
}

module.exports = testNewPost;
