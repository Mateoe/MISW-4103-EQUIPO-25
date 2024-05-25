const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs").promises; // Utilizamos fs.promises para las funciones asincrónicas

async function initialSettings(dirName, width, height) {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
  });
  const page = await browser.newPage();

  await page.setViewport({
    width: width,
    height:height
});

  const logStep = async (step, screenshotPath) => {
    await page.screenshot({ path: screenshotPath });
    console.log(step);
  };

  const screenshotsDir = path.join(__dirname, "..", "results", `${width}x${height}`, dirName);
  await fs.mkdir(screenshotsDir, { recursive: true });

  return { page, logStep, screenshotsDir, browser };
}

module.exports = initialSettings;
