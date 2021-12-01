const fs = require("fs");

function readContentFile(filePath) {

  return fs.readFileSync(filePath, "utf8");
}

module.exports = {
  readContentFile,
};
