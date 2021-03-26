const fs = require('fs');

class CloverFileParser {
    parseFile(filename) {
        if (!fs.existsSync(filename)) {
            throw new Error("Could not find file \"" + filename + "\"");
        }

        let codeCoveragePercentage = 50; // fixme: Actually calculate this value.

        return {
            CodeCoveragePercentage: codeCoveragePercentage,
        };
    }
}

exports.CloverFileParser = CloverFileParser;
