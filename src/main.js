const { readContentFile } = require('../src/fileHandler');

function main() {
    console.log('Program Started');
    console.log(readContentFile('../src/fileHandler.js'));
}

main();

