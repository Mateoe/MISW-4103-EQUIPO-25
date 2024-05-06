const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs").promises; // Utilizamos fs.promises para las funciones asincrónicas

async function initialSettings(dirName){

    const browser = await puppeteer.launch(
      {headless: true,
        defaultViewport: null,
      }
    );
    const page = await browser.newPage();
    // await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });
  
    const logStep = async (step, screenshotPath) => {
      console.log(step);
      await page.screenshot({ path: screenshotPath });
    };
  
    const screenshotsDir = path.join(__dirname, '..', 'results', dirName);
    await fs.mkdir(screenshotsDir, { recursive: true });
  
    return {page, logStep, screenshotsDir, browser};
}

module.exports = initialSettings;
