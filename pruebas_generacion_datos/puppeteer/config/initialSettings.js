const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs").promises; // Utilizamos fs.promises para las funciones asincrónicas

async function initialSettings(dirName) {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });
  const page = await browser.newPage();

  await page.setViewport({
    width: 1920,
    height:1080
});

  const logStep = async (step, screenshotPath) => {
    await page.screenshot({ path: screenshotPath });
    console.log(step);
  };

  const screenshotsDir = path.join(__dirname, "..", "results", dirName);
  await fs.mkdir(screenshotsDir, { recursive: true });

  return { page, logStep, screenshotsDir, browser };
}

module.exports = initialSettings;
