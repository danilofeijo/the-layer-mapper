const genericTestHandler = require("./handlers/genericTestHandler");
const config = require("./globalConfig");
const fs = require("fs");
const csv = require("./resolvers/csvResolver");
const html = require("./resolvers/htmlResolver");


async function main() {
  console.log("Program Started");

  const allTests = _getAllTests();

  _generateJsonFile(allTests);

  await csv.createCsv();
  html.createHtml();

  console.log("Program Finished");
}

main();

function _getAllTests() {
  let allTests = [];

  for (const testType in config) {
    let currentConfig = {};
    switch (testType) {
      case "unitTests":
        currentConfig = { ...config.unitTests, testTypeName: "Unit Tests" };
        break;
      case "integrationTests":
        currentConfig = {
          ...config.integrationTests,
          testTypeName: "Integration Tests",
        };
        break;
      case "endToEndTests":
        currentConfig = { ...config.endToEndTests, testTypeName: "E2E Tests" };
        break;
      default:
        continue;
    }

    const unitTests = genericTestHandler.handle({
      currentConfig: currentConfig,
    });

    allTests.push(unitTests);
  }

  return allTests;
}

function _generateJsonFile(allTests) {
  let separatedTests = [];

  allTests.flat().forEach((testObj) => {
    const parsedData = testObj.tests.reduce((acc, test) => {
      acc.push({
        testType: testObj.testType,
        testFile: testObj.file.fileName,
        absolutePath: testObj.file.absolutePath,
        testName: test,
      });
      return acc;
    }, []);
    separatedTests.push(parsedData);
  });

  const separatedTestsTogether = separatedTests.flat();
  const json = JSON.stringify(separatedTestsTogether);
  fs.writeFileSync("testReport.json", json);
}
