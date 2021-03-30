const core = require('@actions/core');
const fileParsers = require('./src/fileParsers');

function run() {
    try {
        const coverageReport = core.getInput('coverage-report', {required: true});
        const cloverFileParser = new fileParsers.CloverFileParser();
        const result = cloverFileParser.parseFile(coverageReport);

        core.info("Code coverage is " + result.CodeCoveragePercentage + "%");
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
