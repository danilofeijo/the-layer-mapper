const fileResolver = require("../resolvers/fileResolver");
const csv = require("../resolvers/csvResolver");

function handle({currentConfig}) {
  let allTests = [];

  const fileReferenceList = fileResolver.getTestFileReferenceList(
    currentConfig.folderPath
  );

  fileReferenceList.forEach((fileObj) => {
    const fileContent = fileResolver.readFileContent(fileObj.absolutePath);
    const testName = fileResolver.getTestNames({
      fileType: currentConfig.testTypeName,
      fileObj: fileObj,
      fileContent: fileContent,
      testRegex: new RegExp(currentConfig.regex, "gm")
    });
    allTests.push(testName);
  });

  return allTests;
}

module.exports = {
  handle,
};
