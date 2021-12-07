const fileResolver = require("../resolvers/fileResolver");
const config = require("../globalConfig")
const csv = require("../resolvers/csvResolver");

function handle() {
  let allTests = [];
  const fileReferenceList = fileResolver.getTestFileReferenceList(config.unitTests.folderPath);

  fileReferenceList.forEach((fileObj) => {
    const fileContent = fileResolver.readFileContent(fileObj.absolutePath);
    const testName = fileResolver.getTestNames(fileObj, fileContent, new RegExp(config.unitTests.regex, 'gm'));
    allTests.push(testName);
  });

  csv.createCsv({data: allTests});

  return allTests;
}

module.exports = {
  handle,
};
