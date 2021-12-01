const fileHandler = require("../fileHandler");
const fs = require("fs");

describe("fileHandler.js tests", () => {
  const filePath = "./test.js";
  const fileContent = "console.log('testing')";

  beforeEach(() => {
    fs.writeFileSync(filePath, fileContent, () => {
      console.log("file created");
    });
  });

  it("should read a file content", () => {
    const content = fileHandler.readContentFile(filePath);
    expect(content).toBe(fileContent);
  });

  afterEach(() => {
    fs.unlinkSync(filePath);
  });
});
