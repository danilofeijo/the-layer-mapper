const fileResolver = require("../resolvers/fileResolver");

// const FILES_FOLDER_PATH = "../src/tests";

/**
 * 
 * @param {Object} settings - The settings who guides the test hunting
 * @returns 
 */
function handle(settings) {
  let allTests = [];
  const fileReferenceList = fileResolver.getTestFileReferenceList(settings.filesFolderPath);

  fileReferenceList.forEach((filePath, index) => {
    const fileContent = fileResolver.readFileContent(fileReferenceList[index].absolutePath);
    const testName = fileResolver.getTestNames(filePath, fileContent, settings.testRegex);
    allTests.push(testName);
  });

  return allTests;
}

module.exports = {
  handle,
};
