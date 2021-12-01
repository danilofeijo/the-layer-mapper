const fileResolver = require("../resolvers/fileResolver");

const FILES_FOLDER_PATH = "../src/tests";

function handle() {
  let allTests = [];
  const fileNameList = fileResolver.getTestFilesNames(FILES_FOLDER_PATH);

  fileNameList.forEach((filePath) => {
    const fileContent = fileResolver.readFileContent(
      FILES_FOLDER_PATH + "/" + filePath
    );
    const testsName = fileResolver.getTestsName(filePath, fileContent);
    allTests.push(testsName);
  });

  return allTests;
}

module.exports = {
  handle,
};
