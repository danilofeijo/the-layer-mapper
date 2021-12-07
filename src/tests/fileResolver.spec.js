const fileResolver = require("../resolvers/fileResolver");
const fs = require("fs");

const fileContent = `it("should do nothing", () => {
  expect(true).toBe(true);
});
it("should do nothing twice", () => {
  expect(true).toBe(true);
});`;

function _createTestFiles(times) {
  let filePathList = [];
  for (let i = 0; i < times; i++) {
    const filePathAndName = `./test${i + 1}.spec.js`;
    
    fs.writeFileSync(filePathAndName, fileContent, () => {
      console.log("file created");
    });

    filePathList.push(filePathAndName);
  }
  return filePathList;
}

function _createNormalFiles(times) {
  let filePathList = [];
  for (let i = 0; i < times; i++) {
    const filePathAndName = `./notATest${i + 1}.js`;
    const fileContent = `it("should do nothing", () => {
    expect(true).toBe(true);
  });
  it("should do nothing twice", () => {
    expect(true).toBe(true);
  });`;

    fs.writeFileSync(filePathAndName, fileContent, () => {
      console.log("file created");
    });

    filePathList.push(filePathAndName);
  }
  return filePathList;
}

function _deleteFiles(filePathList) {
  filePathList.forEach((filePath) => {
    fs.unlinkSync(filePath);
  });
}

describe("fileHandler.js tests", () => {
  let filePathList = [];

  beforeEach(() => {
    filePathList = _createTestFiles(5);
  });

  it("should read a file content", () => {
    const sut = fileResolver.readFileContent(filePathList[0]);
    expect(sut).toBe(fileContent);
  });

  it("should get the name of test files inside a folder", () => {
    const filteredFiles = [
      { fileName: "test1.spec.js", absolutePath: "test1.spec.js" },
      { fileName: "test2.spec.js", absolutePath: "test2.spec.js" },
    ];

    fs.readdirSync = jest
      .fn()
      .mockReturnValue(["test1.spec.js", "test2.spec.js", "notATest1.js"]);

    const normalFilesList = _createNormalFiles(1);

    const sut = fileResolver.getTestFileReferenceList("./");
    expect(sut).toStrictEqual(filteredFiles);

    _deleteFiles(normalFilesList);
  });

  it("should get the name of the test cases inside a file", () => {
    const testRegex = /.*it[(]['\"](.+?)['\"`]/gm;
    const fileName = filePathList[0];
    const result = {
      file: fileName,
      tests: ["should do nothing", "should do nothing twice"],
    };

    const sut = fileResolver.getTestNames(fileName, fileContent, testRegex);

    expect(sut).toStrictEqual(result);
  });

  afterEach(() => {
    _deleteFiles(filePathList);
  });
});
