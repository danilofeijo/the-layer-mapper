const fileResolver = require("../resolvers/fileResolver");
const fs = require("fs");

describe("fileHandler.js tests", () => {
  const filePath = "./test.js";
  const fileName = "test.js";
  const fileContent = `it("should do nothing", () => {
    expect(true).toBe(true);
  });
  it("should do nothing twice", () => {
    expect(true).toBe(true);
  });`;

  beforeEach(() => {
    fs.writeFileSync(filePath, fileContent, () => {
      console.log("file created");
    });
  });

  it("should read a file content", () => {
    const sut = fileResolver.readFileContent(filePath);
    expect(sut).toBe(fileContent);
  });

  it("should get the name of test files inside a folder", () => {
    const filteredFiles = ["test1.spec.js", "test2.spec.js"];

    fs.readdirSync = jest
      .fn()
      .mockReturnValue(["test1.spec.js", "test2.spec.js", "notATest.js"]);

    const sut = fileResolver.getTestFilesNames("/blah");
    expect(sut).toStrictEqual(filteredFiles);
  });

  it("should get the name of the test cases inside a file", () => {
    const result = {
      fileName: fileName,
      tests: ["should do nothing", "should do nothing twice"],
    };

    const sut = fileResolver.getTestsName(fileName, fileContent);

    expect(sut).toStrictEqual(result);
  });

  afterEach(() => {
    fs.unlinkSync(filePath);
  });
});
