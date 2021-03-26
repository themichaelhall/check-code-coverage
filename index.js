const core = require('@actions/core');
const fileParsers = require('./src/fileParsers');

function run() {
    try {
        const cloverFileParser = new fileParsers.CloverFileParser();
        const result = cloverFileParser.parseFile('test/test.xml');

        core.info("Code coverage is " + result.CodeCoveragePercentage + "%");
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
