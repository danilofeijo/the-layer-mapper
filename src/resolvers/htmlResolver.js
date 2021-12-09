const config = require("../globalConfig");
const fs = require("fs");
const testReport = require("../testReport.json");

const htmlTemplate = `<html>
<head>
<title>Test Report</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
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
${generateContent()}
</tbody>
</html>`;

function generateContent() {
  let content = "";

  testReport.forEach((test) => {
    content += `<tr><td>${test.testName}</td><td>${test.testType}</td><td>${test.absolutePath}</td></tr>`;
  });

  return content;
}

function createFolderIfNotExists(path) {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }
}

function createHtml() {
  createFolderIfNotExists(config.outputFolder);

  fs.writeFileSync(`${config.outputFolder}/testReport.html`, htmlTemplate);
  console.log("The Html file was created successfully");
}

module.exports = {
  createHtml,
};
