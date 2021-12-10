const fs = require("fs");
const path = require("path");

function getTestFileReferenceList(baseFolderPath) {

  if (!fs.existsSync(baseFolderPath)) {
    throw new Error(`Base folder path ${baseFolderPath} does not exist`);
  }

  const allFilesNameList = fs.readdirSync(baseFolderPath);
  let result = [];
  allFilesNameList.forEach((fileName) => {
    const absolute = path.join(baseFolderPath, fileName);
    if (fs.statSync(absolute).isDirectory()) {
      result.push(...getTestFileReferenceList(absolute));
    }
    if (fileName.endsWith(".spec.js")) {
      result.push({ fileName: fileName, absolutePath: absolute });
    }
  });
  return result;
}

function readFileContent(filePath) {
  return fs.readFileSync(filePath, "utf8").toString();
}

function getTestNames({fileType, fileObj, fileContent, testRegex}) {
  const result = [];
  let match = testRegex.exec(fileContent);

  do {
    result.push(match[1]);
  } while ((match = testRegex.exec(fileContent)) !== null);

  return {
    file: fileObj,
    testType: fileType,
    tests: result,
  };
}

module.exports = {
  getTestFileReferenceList,
  readFileContent,
  getTestNames,
};
