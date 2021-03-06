const unitTestHandler = require("../handlers/unitTestHandler");
const fileResolver = require("../resolvers/fileResolver");

jest.mock("../resolvers/csvResolver");

describe("fileHandler.js tests", () => {
  const fileContent = "console.log('testing')";

  it("should return the tests names separated by file", () => {

    const fileNameList = ["blah1.spec.js", "blah2.spec.js"];
    const testsArray = ["test1", "test2"];

    const testReturnObj1 = {
      fileName: "blah1.spec.js",
      tests: testsArray,
    };

    const testReturnObj2 = {
      fileName: "blah2.spec.js",
      tests: testsArray,
    };

    const result = [
      {
        fileName: fileNameList[0],
        tests: testsArray,
      },
      {
        fileName: fileNameList[1],
        tests: testsArray,
      },
    ];

    fileResolver.getTestFileReferenceList = jest.fn().mockReturnValue(fileNameList);
    fileResolver.readFileContent = jest.fn().mockReturnValue(fileContent);
    fileResolver.getTestNames = jest
      .fn()
      .mockReturnValueOnce(testReturnObj1)
      .mockReturnValueOnce(testReturnObj2);


    const sut = unitTestHandler.handle();

    expect(sut).toStrictEqual(result);
  });
});
