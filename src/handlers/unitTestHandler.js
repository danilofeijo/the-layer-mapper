const fileResolver = require("../resolvers/fileResolver");
const config = require("../globalConfig")

function handle() {
  let allTests = [];
  const fileReferenceList = fileResolver.getTestFileReferenceList(config.unitTests.folderPath);

  fileReferenceList.forEach((filePath, index) => {
    const fileContent = fileResolver.readFileContent(fileReferenceList[index].absolutePath);
    const testName = fileResolver.getTestNames(filePath, fileContent, new RegExp(config.unitTests.regex, 'gm'));
    allTests.push(testName);
  });

  return allTests;
}

module.exports = {
  handle,
};
