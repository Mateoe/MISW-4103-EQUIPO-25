// Test relacionado con Crear un Post y que este se publique para la proxima semana.
const puppeteer = require("puppeteer");
const path = require("path");
const pathfolder = path.resolve(__dirname);

const faker = require("faker");

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
    });

    const page = await browser.newPage();

    console.log(
      "Iniciando test Crear un Post y que este se publique para la proxima semana."
    );

    // Login
    await page.goto("https://ghost-5ehz.onrender.com/ghost/#/signin");
    await page.waitForSelector("#identification");
    await page.type("#identification", "test@test.com", { delay: 100 });
    await page.type("#password", "Test@test25", { delay: 100 });
    await page.click("#ember5 > span");
    await page.waitForSelector(
      "body > div.gh-app > div > nav.gh-nav > div > header", {timeout: 60000}
    );
    await page.screenshot({ path: `${pathfolder}/img/1_after-login.png` });

    // Entrar a posts y crear un post
    await page.click('[data-test-nav="new-story"]');

    // const faketitle = faker.name.title();
    // console.log("Fake Name:", faketitle);
    // await page.type("[data-test-editor-title-input]", faketitle, {
    //   delay: 200,
    // });


    await new Promise((r) => setTimeout(r, 30000));

    // Guardar el Post
    // await page.screenshot({ path: `${pathfolder}/img/2_create-post.png` });

    // await page.waitForSelector('button[data-test-button="publish-flow"]');
    // await page.click('button[data-test-button="publish-flow"]');

    // let butt = await page.$x('/html/body/div[5]/div/div/div/div[2]/div[3]/button');
    // await butt[0].click();

    const btn_schedule = await page.waitForXPath('/html/body/div[5]/div/div/div/div[2]/div[3]/button')
    btn_schedule.click();


    

    await new Promise((r) => setTimeout(r, 4000));


    // // Configurar la fecha de publicación
    // await page.click('div.gh-radio-button[data-test-radio="schedule"]');

    // // Calculate the date that is 7 days from now
    // const currentDate = new Date();
    // const futureDate = new Date(currentDate);
    // futureDate.setDate(futureDate.getDate() + 7);

    // // Format the date as YYYY-MM-DD
    // const year = futureDate.getFullYear();
    // const month = String(futureDate.getMonth() + 1).padStart(2, '0');
    // const day = String(futureDate.getDate()).padStart(2, '0');
    // const formattedDate = `${year}-${month}-${day}`;

    // await page.type(
    //     'input[type="text"][placeholder="YYYY-MM-DD"]',
    //     formattedDate,
    //     { delay: 100 }
    // );


    
    await new Promise((r) => setTimeout(r, 3000));


    // // Guardar el post
    // await page.waitForSelector('button[data-test-button="continue"]');
    // await page.click('button[data-test-button="continue"]');

    // await page.waitForSelector('button[data-test-button="confirm-publish"]');
    // await page.click('button[data-test-button="confirm-publish"]');

    // await page.waitForSelector('button[data-test-button="back-to-editor"]', {
    //   timeout: 30000,
    // });
    // await page.screenshot({ path: `${pathfolder}/img/4_publish.png` });

    // await page.goBack();

    // //Cerrar sesión desde menu principal
    // await page.click('[data-test-nav="dashboard"]');
    // await new Promise((r) => setTimeout(r, 1000));

    // await page.click(".ember-basic-dropdown-trigger");
    // await page.waitForSelector(".user-menu-signout");
    // await page.click(".user-menu-signout");

    // await page.waitForSelector("#identification");
    await page.screenshot({ path: `${pathfolder}/img/5_finaliza.png` });

    console.log("Test finalizado con éxito");

    await browser.close();
  } catch (error) {
    console.error("An error occurred:", error);
    // Take a screenshot if an error occurs
    if (page) {
      await page.screenshot({ path: `${pathfolder}/img/error.png` });
    }
    if (browser) {
      await browser.close();
    }
  }
})();
