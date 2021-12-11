const genericTestHandler = require("./handlers/genericTestHandler");
const config = require("./globalConfig");
const fs = require("fs");
const eventBus = require("./utils/eventBus");
require("./resolvers/csvResolver");
require("./resolvers/htmlResolver");

async function main() {
  console.log("Program Started");

  const allTests = _getAllTests();

  await _generateJsonFile(allTests);

  console.log("Program Finished");
}

main();

function _getAllTests() {
  let allTests = [];

  for (const testType in config) {
    let currentConfig = {};
    switch (testType) {
      case "unitTests":
        currentConfig = { ...config.unitTests, testTypeName: "Unit Test" };
        break;
      case "integrationTests":
        currentConfig = {
          ...config.integrationTests,
          testTypeName: "Integration Test",
        };
        break;
      case "endToEndTests":
        currentConfig = { ...config.endToEndTests, testTypeName: "E2E Test" };
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

async function _generateJsonFile(allTests) {
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
  fs.writeFile("testReport.json", json, (err) => {
    if (err) {
      return console.log(err);
    }
    console.log("JSON file generated");
    eventBus.emit("jsonGenerated", "test message");
  });
}
