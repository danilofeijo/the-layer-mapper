const fs = require("fs");
const path = require("path");

function getTestFileReferenceList(baseFolderPath) {

  if (!fs.existsSync(baseFolderPath)) {
    throw new Error(`Base folder path ${baseFolderPath} does not exist`);
  }

  const allFilesNameList = fs.readdirSync(baseFolderPath);
  let result = [];
  allFilesNameList.forEach((file) => {
    const absolute = path.join(baseFolderPath, file);
    if (fs.statSync(absolute).isDirectory()) {
      result.push(...getTestFileReferenceList(absolute));
    }
    if (file.endsWith(".spec.js")) {
      result.push({ file: file, absolutePath: absolute });
    }
  });
  return result;
}

function readFileContent(filePath) {
  return fs.readFileSync(filePath, "utf8").toString();
}

function getTestNames(fileName, fileContent, testRegex) {
  const result = [];
  let match = testRegex.exec(fileContent);

  do {
    console.log(`Match: ${match[1]}`);
    result.push(match[1]);
  } while ((match = testRegex.exec(fileContent)) !== null);

  return {
    fileName: fileName,
    tests: result,
  };
}

module.exports = {
  getTestFileReferenceList,
  readFileContent,
  getTestNames,
};
