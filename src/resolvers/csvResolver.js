const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const config = require("../globalConfig");
const fs = require("fs");

function createFolderIfNotExists(path) {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }
}

function createCsv({ data }) {
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

  const parsedData = data.reduce((acc, item) => {
    item.tests.forEach((test) => {
      acc.push({
        testType: "Unit Test",
        testFile: item.file.fileName,
        absolutePath: item.file.absolutePath,
        testName: test,
      });
    });
    return acc;
  }, []);

  csvWriter
    .writeRecords(parsedData)
    .then(() => console.log("The CSV file was written successfully"));
}

module.exports = {
  createCsv,
};
