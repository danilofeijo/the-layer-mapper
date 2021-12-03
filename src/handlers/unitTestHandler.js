const fileResolver = require("../resolvers/fileResolver");

// const FILES_FOLDER_PATH = "../src/tests";

/**
 * 
 * @param {Object} settings - The settings who guides the test hunting
 * @returns 
 */
function handle(settings) {
  let allTests = [];
  const fileNameList = fileResolver.getTestFilesNames(settings.filesFolderPath);

  fileNameList.forEach((filePath) => {
    const fileContent = fileResolver.readFileContent(
      settings.filesFolderPath + "/" + filePath
    );
    const testsName = fileResolver.getTestsName(filePath, fileContent, settings.testRegex);
    allTests.push(testsName);
  });

  return allTests;
}

module.exports = {
  handle,
};
