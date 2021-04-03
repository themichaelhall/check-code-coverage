const reportParsers = require('./reportParsers');

/**
 * Main application class.
 */
class Application {
    /**
     * Run the application.
     *
     * @param {string} coverageReport The "report" input value.
     * @param {string} requiredCoveragePercentage The "required-percentage" input value.
     */
    run(coverageReport, requiredCoveragePercentage) {
        const requiredCoveragePercentageAsInteger = +requiredCoveragePercentage;

        if (isNaN(requiredCoveragePercentageAsInteger) || requiredCoveragePercentageAsInteger < 0 || requiredCoveragePercentageAsInteger > 100) {
            throw new Error('"required-percentage" parameter must be a number between 0 and 100');
        }

        const cloverFileParser = new reportParsers.CloverFileParser();
        const result = cloverFileParser.parseFile(coverageReport);
        const isSuccess = result.CodeCoveragePercentage >= requiredCoveragePercentageAsInteger;

        return {
            'isSuccess': isSuccess,
            'message': 'Code coverage is ' + result.CodeCoveragePercentage + '%, required code coverage is ' + requiredCoveragePercentageAsInteger + '%',
        };
    }
}

exports.Application = Application;
