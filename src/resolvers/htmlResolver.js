const config = require("../globalConfig");
const fs = require("fs");

const eventBus = require("../utils/eventBus");

eventBus.addListener("jsonGenerated", createHtmlFile);

function generateHtmlContent() {
  const testReport = require("../testReport.json");

  let content = "";

  testReport.forEach((test) => {
    content += `<tr><td>${test.testName}</td><td>${test.testType}</td><td>${test.absolutePath}</td></tr>`;
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
      .final__triangle {
        position: relative;
        height: 320px;
        clip-path: polygon(50% 0%, 20% 100%, 80% 100%);
        text-align: center;
      }
  
      .final__triangle div {
        position: absolute;
        line-height: 100px;
  
        width: 100%;
        height: 100px;
        color: white;
      }
  
      .final__triangle .top {
        background: #70AE6E;
      }
  
      .final__triangle .top:hover {
        background: #588a56;
      }
  
      .final__triangle .mid {
        top: 110px;
        background: #C17817;
      }
  
      .final__triangle .mid:hover {
        background: #965d14;
      }
  
      .final__triangle .bottom {
        top: 220px;
        background: #B10F2E;
      }
  
      .final__triangle .bottom:hover {
        background: #8a0c23;
      }
    </style>
  </head>
  
  <body>
  
    <div class="container">
    
      <section>
  
        <div class="final__triangle">
  
          <div class="top">0</div>
  
          <div class="mid">0</div>
  
          <div class="bottom">0</div>
  
        </div>
  
      </section>
      <h1>Test Report</h1>
      <table class="table table-striped">
        <thead>
          <tr>
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
