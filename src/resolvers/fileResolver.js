const fs = require("fs");

const JEST_REGEX = /.*it[(]['\"](.+?)['\"`],/gm;

function getTestFilesNames(path) {
  const allFilesNameList = fs.readdirSync(path);
  let result = [];
  allFilesNameList.forEach((file) => {
    if (file.endsWith(".spec.js")) {
      result.push(file);
    }
  });
  return result;
}

function readFileContent(filePath) {
  return fs.readFileSync(filePath, "utf8").toString();
}

function getTestsName(fileName, fileContent) {
  const result = [];
  let match = JEST_REGEX.exec(fileContent);

  do {
    console.log(`Match: ${match[1]}`);
    result.push(match[1]);
  } while ((match = JEST_REGEX.exec(fileContent)) !== null);

  return {
    fileName: fileName,
    tests: result,
  };
}

module.exports = {
  getTestFilesNames,
  readFileContent,
  getTestsName,
};
