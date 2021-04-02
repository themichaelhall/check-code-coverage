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
        if (typeof (coverageReport) !== 'string') {
            throw new Error('"coverage-report" parameter must be a string');
        }

        if (typeof (requiredCoveragePercentage) !== 'number' || requiredCoveragePercentage < 0 || requiredCoveragePercentage > 100) {
            throw new Error('"required-coverage-percentage" parameter must be a number between 0 and 100');
        }

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
