const config = require("../globalConfig");
const fs = require("fs");
const counter = require("../utils/counter");
const eventBus = require("../utils/eventBus");

eventBus.addListener("jsonGenerated", createHtmlFile);

function generateHtmlContent() {
  const testReport = require("../testReport.json");

  const allTestsCount = counter.countAllTests({ tests: testReport });
  const unitTestsCount = counter.countUnitTests({ tests: testReport });
  const integrationTestsCount = counter.countUnitTests({ tests: testReport });
  const e2eTestsCount = counter.countUnitTests({ tests: testReport });

  let content = "";

  testReport.forEach((test, index) => {
    content += `<tr><th scope="row">${index + 1}</th><td>${
      test.testName
    }</td><td>${test.testType}</td><td>${test.absolutePath}</td></tr>`;
  });

  return `<!doctype html>
  <html lang="en">
  <head>
    <title>Test Report</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
      integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
      <style type="text/css">
      .pyramid {
        position: relative;
        height: 320px;
        clip-path: polygon(50% 0%, 20% 100%, 80% 100%);
        text-align: center;
        opacity: 1;
      }

      .pyramid div {
        position: absolute;
        line-height: 100px;
        width: 100%;
        height: 100px;
        color: white;
      }

      .pyramid .top {
        background: #70ae6e;
        opacity: 0.5;
        transition: 0.4s ease-out;
      }

      .pyramid .top:hover {
        opacity: 1;
        transition: 0.4s ease-out;
      }

      .pyramid .mid {
        top: 110px;
        opacity: 0.5;
        background: #c17817;
      }

      .pyramid .mid:hover {
        opacity: 1;
        transition: 0.4s ease-out;
      }

      .pyramid .bottom {
        top: 220px;
        opacity: 0.5;
        background: #b10f2e;
      }

      .pyramid .bottom:hover {
        opacity: 1;
        transition: 0.4s ease-out;
      }
    </style>
  </head>
  
  <body>
  
    <div class="container">
    
      <section>
  
        <div class="pyramid">
  
          <div class="top">${unitTestsCount}</div>
  
          <div class="mid">${integrationTestsCount}</div>
  
          <div class="bottom">${e2eTestsCount}</div>
  
        </div>
  
      </section>
      <br/>
      <div class="row">
        <h1 class="col-6">Test Report</h1>
        <h3 class="col-6 text-end">Total Tests: ${allTestsCount}</h3>
      </div>
      
      <table class="table table-striped table-hover">
        <thead class="table-dark">
          <tr>
            <th scope="col">#</th>
            <th>Test Name</th>
            <th>Test Type</th>
            <th>File Path</th>
          </tr>
        </thead>
        <tbody>
          ${content}
        </tbody>
      </table>
    </div>
  </body>
</html>`;
}

function createFolderIfNotExists(path) {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }
}

function createHtmlFile() {
  createFolderIfNotExists(config.outputFolder);

  fs.writeFileSync(
    `${config.outputFolder}/testReport.html`,
    generateHtmlContent()
  );
  console.log("The Html file was created successfully");
}
