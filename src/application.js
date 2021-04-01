const fileParsers = require('./fileParsers');

/**
 * Main application class.
 */
class Application {
    /**
     * Run the application.
     *
     * @param {string} coverageReport
     * @param {number} requiredCoveragePercentage
     */
    run(coverageReport, requiredCoveragePercentage) {
        // fixme: validate parameters
        const cloverFileParser = new fileParsers.CloverFileParser();
        const result = cloverFileParser.parseFile(coverageReport);
        const isSuccess = result.CodeCoveragePercentage >= requiredCoveragePercentage;

        return {
            'isSuccess': isSuccess,
            'message': 'Code coverage is ' + result.CodeCoveragePercentage + '%, required code coverage is ' + requiredCoveragePercentage + '%',
        };
    }
}

exports.Application = Application;
