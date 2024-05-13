const path = require("path");
const fs = require("fs").promises;

async function initialSettings(dirName, screenshots) {
  const compareDir = path.join(
    __dirname,
    "..",
    "reports",
    "results",
    "results_compare",
    dirName
  );
  await fs.mkdir(compareDir, { recursive: true });

  const ghost3Dir = path.join(
    __dirname,
    "..",
    "reports",
    "results",
    "results_ghost3",
    dirName
  );
  await fs.mkdir(ghost3Dir, { recursive: true });

  const ghost5Dir = path.join(
    __dirname,
    "..",
    "reports",
    "results",
    "results_ghost5",
    dirName
  );
  await fs.mkdir(ghost5Dir, { recursive: true });

  const reportsDir = path.join(__dirname, "..", "reports", dirName);
  await fs.mkdir(reportsDir, { recursive: true });

  function step(escenario, imagePath, info) {
    return `<div class="step" id="test0">
    <div class=" btitle">
        <h2>Step: ${imagePath}</h2>
        <p>Data: ${JSON.stringify(info)}</p>
    </div>
    <div class="imgline">
      <div class="imgcontainer">
        <span class="imgname">Ghost 3 Image</span>

        <img class="img2" src="../results/results_ghost3/${escenario}/${imagePath}" id="ghost3Image" label="Ghost 3 Image">
      </div>
      <div class="imgcontainer">
        <span class="imgname">Ghost 5 Image</span>
        <img class="img2" src="../results/results_ghost4/${escenario}/${imagePath}" id="ghost4Image" label="Ghost 4 Image">
      </div>
    </div>
    <div class="imgline">
      <div class="imgcontainer">
        <span class="imgname">Diff Image</span>
        <img class="imgfull" src="../results/results_compare/${escenario}/compare_${imagePath}" id="diffImage" label="Diff">
      </div>
    </div>
  </div>`;
  }

  function createReport(escenario, resInfo) {
    return `
    <html>
        <head>
            <title> VRT Report </title>
            <link href="index.css" type="text/css" rel="stylesheet">
        </head>
        <body>
            <h1>Report for ${escenario} 
            </h1>
            <div id="visualizer">

             ${screenshots.map((b) => step(escenario, b, resInfo[b]))}


            </div>
        </body>
    </html>`;
  }

  function createCss() {
    return `
    .browser {
        position: relative;
        margin: 5px auto;
        padding: 10px 30px;
        background-color: #FAFAFA;
        box-shadow: 0 3px 6px 0 rgba(0,0,0,0.16);
        min-height: 40px;
        -webkit-break-inside: avoid;
        break-inside: avoid;
    }
    .btitle {
        padding: 5px 0;
    }
    .imgline {
        position: relative;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
    }
    .imgcontainer {
        -webkit-flex: 1 1 auto;
        -ms-flex: 1 1 auto;
        flex: 1 1 auto;
        padding: 0 25px;
        padding-top: 20px;
        text-align: center;
    }
    .imgname {
        text-align: center;
        font-family: latoregular;
        color: #787878;
        display: block;
        margin: 0 auto;
        text-transform: uppercase;
        padding: 5px 0;
        padding-bottom: 15px;
        font-size: 12px;
    }
    .img2 {
        width: auto;
        max-width: 100%;
        max-height: 400px;
    }
    .imgfull{
        width:100%
    }`;
  }

  return {
    compareDir,
    ghost3Dir,
    ghost5Dir,
    reportsDir,
    createReport,
    createCss,
  };
}
module.exports = initialSettings;
