function countAllTests({ tests }) {
    
    return tests.length
}

function countUnitTests({ tests }) {
    
    return tests.filter(test => test.testType === 'Unit Test').length
}

function countIntegrationTests({ tests }) {
    
    return tests.filter(test => test.testType === 'Integration Test').length
}

function countE2ETests({ tests }) {
    
    return tests.filter(test => test.testType === 'E2E Test').length
}

module.exports = {
    countAllTests,
    countUnitTests,
    countIntegrationTests,
    countE2ETests
}