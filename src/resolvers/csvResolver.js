const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const config = require("../globalConfig");
const fs = require("fs");
const testReport = require("../testReport.json");

function createFolderIfNotExists(path) {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }
}

async function createCsv() {
  createFolderIfNotExists(config.outputFolder);
  const csvWriter = createCsvWriter({
    path: `${config.outputFolder}/tests-report.csv`,
    header: [
      { id: "testType", title: "Type" },
      { id: "testFile", title: "File" },
      { id: "absolutePath", title: "Absolute Path" },
      { id: "testName", title: "Test Name" },
    ],
  });

  await csvWriter.writeRecords(testReport);

  console.log("The CSV file was written successfully");
}

module.exports = {
  createCsv,
};
