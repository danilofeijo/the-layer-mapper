const unitTestHandler = require("../src//handlers/unitTestHandler.js");

function main() {
  console.log("Program Started");
  const unitTests = unitTestHandler.handle();
  console.log("********* UNIT TESTS *********");
  console.log(unitTests);
}

main();
