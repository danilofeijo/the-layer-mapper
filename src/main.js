const unitTestHandler = require("../src//handlers/unitTestHandler.js");

function main() {

  // TODO - Converter dados do objeto em arquivo de configuração
  const settings = {
    filesFolderPath: '../src/tests',
    testRegex: /.*it[(]['\"](.+?)['\"`]/gm,
  }

  console.log("Program Started");
  const unitTests = unitTestHandler.handle(settings);
  console.log("********* UNIT TESTS *********");
  console.log(unitTests);
}

main();
