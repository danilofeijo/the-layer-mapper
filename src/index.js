const unitTestHandler = require("./handlers/unitTestHandler.js");

  console.log("Program Started");
  const unitTests = unitTestHandler.handle();
  console.log("********* UNIT TESTS *********");
  console.log(unitTests);

