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

  return `<html>
  <head>
  <title>Test Report</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
  </head>
  <body>
  <div class="container">
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
  </html>`;
}

function createFolderIfNotExists(path) {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }
}

function createHtmlFile() {
  createFolderIfNotExists(config.outputFolder);

  fs.writeFileSync(`${config.outputFolder}/testReport.html`, generateHtmlContent());
  console.log("The Html file was created successfully");
}
