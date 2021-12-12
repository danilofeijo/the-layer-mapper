const config = require("../globalConfig");
const fs = require("fs");
const counter = require("../utils/counter");
const eventBus = require("../utils/eventBus");

eventBus.addListener("jsonGenerated", createHtmlFile);

function generateHtmlContent() {
  const testReport = require("../testReport.json");

  const allTestsCount = counter.countAllTests({ tests: testReport });
  const unitTestsCount = counter.countUnitTests({ tests: testReport });
  const integrationTestsCount = counter.countUnitTests({ tests: testReport });
  const e2eTestsCount = counter.countUnitTests({ tests: testReport });

  let content = "";

  testReport.forEach((test, index) => {
    content += `<tr><th scope="row">${index + 1}</th><td>${
      test.testName
    }</td><td>${test.testType}</td><td>${test.absolutePath}</td></tr>`;
  });

  return `<!doctype html>
  <html lang="en">
  <head>
    <title>Test Report</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
      integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
      <style type="text/css">
      .pyramid {
        position: relative;
        height: 320px;
        clip-path: polygon(50% 0%, 20% 100%, 80% 100%);
        text-align: center;
        opacity: 1;
      }

      .pyramid div {
        position: absolute;
        line-height: 100px;
        width: 100%;
        height: 100px;
        color: white;
      }

      .pyramid .top {
        background: #70ae6e;
        opacity: 0.5;
        transition: 0.4s ease-out;
        line-height: 120px !important;
      }

      .pyramid .top:hover {
        opacity: 1;
        transition: 0.4s ease-out;
      }

      .pyramid .mid {
        top: 110px;
        opacity: 0.5;
        background: #c17817;
      }

      .pyramid .mid:hover {
        opacity: 1;
        transition: 0.4s ease-out;
      }

      .pyramid .bottom {
        top: 220px;
        opacity: 0.5;
        background: #b10f2e;
      }

      .pyramid .bottom:hover {
        opacity: 1;
        transition: 0.4s ease-out;
      }
    </style>
  </head>
  
  <body>
  
    <div class="container">
    
      <section>
  
        <div class="pyramid">
  
          <div class="top" id="e2e-tests">${unitTestsCount}</div>
  
          <div class="mid" id="integration-tests">${integrationTestsCount}</div>
  
          <div class="bottom" id="unit-tests">${e2eTestsCount}</div>
  
        </div>
  
      </section>
      <br/>
      <div class="row">
        <h1 class="col-6">Test Report</h1>
        <h3 class="col-6 text-end p-3">
          Total Tests: ${allTestsCount}
          <button class="btn btn-primary" id="show-all-tests">
            Show All Tests
          </button>
        </h3>
      </div>
      
      <table id="tests-table" class="table table-striped table-hover">
        <thead class="table-dark">
          <tr>
            <th scope="col">#</th>
            <th>Test Name</th>
            <th>Test Type</th>
            <th>File Path</th>
          </tr>
        </thead>
        <tbody id="table-body">
          ${content}
        </tbody>
      </table>
    </div>
  </body>
  <script>
    const rows = document
      .getElementById("tests-table")
      .getElementsByTagName("tr");

    const unitTestsFilter = document.getElementById("unit-tests");
    const integrationTestsFilter = document.getElementById("integration-tests");
    const e2eTestsFilter = document.getElementById("e2e-tests");
    const showAllTestsButton = document.getElementById("show-all-tests");
    const tableBody = document.getElementById("table-body");

    const allElements = [
      ...Array.from(rows).filter(
        (row) => row.cells[2].innerHTML === "Unit Test"
      ),
      ...Array.from(rows).filter(
        (row) => row.cells[2].innerHTML === "Integration Test"
      ),
      ...Array.from(rows).filter(
        (row) => row.cells[2].innerHTML === "E2E Test"
      ),
    ];

    showAllTestsButton.addEventListener("click", () => {
      tableBody.innerHTML = allElements
        .map((element) => element.outerHTML)
        .join("");
    });

    unitTestsFilter.addEventListener("click", () => {
      tableBody.innerHTML = filterElementsByType('Unit Test');
    });

    integrationTestsFilter.addEventListener("click", () => {
      tableBody.innerHTML = filterElementsByType('Integration Test');
    });

    e2eTestsFilter.addEventListener("click", () => {
      tableBody.innerHTML = filterElementsByType('E2E Test');
    });

    function filterElementsByType(type) {
      return allElements
        .filter((row) => row.cells[2].innerHTML === type)
        .map((row) => row.outerHTML)
        .join("");
    }
  </script>
</html>`;
}

function createFolderIfNotExists(path) {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }
}

function createHtmlFile() {
  createFolderIfNotExists(config.outputFolder);

  fs.writeFileSync(
    `${config.outputFolder}/testReport.html`,
    generateHtmlContent()
  );
  console.log("The Html file was created successfully");
}
