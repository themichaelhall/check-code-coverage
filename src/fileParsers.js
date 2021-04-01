const fs = require('fs');
const xml2js = require('xml2js');

/**
 * Clover file parser class.
 */
class CloverFileParser {
    /**
     * Parses a clove file.
     *
     * @param {string} filename
     *
     * @return {{CodeCoveragePercentage: number}}
     */
    parseFile(filename) {
        if (!fs.existsSync(filename)) {
            throw new Error('Could not find file "' + filename + '"');
        }

        try {
            const parsedXml = this.parseXmlFile(filename);

            const coverageNode = this.getParsedXmlNode(parsedXml, 'coverage');
            const projectNode = this.getParsedXmlNode(coverageNode, 'project');
            const metricsNode = this.getParsedXmlNode(projectNode, 'metrics');

            // The following code is based on the formula for calculating clover coverage percentage found here:
            // https://confluence.atlassian.com/clover/how-are-the-clover-coverage-percentages-calculated-79986990.html
            const coveredConditionals = this.getParsedXmlIntegerAttribute(metricsNode, 'coveredconditionals');
            const coveredStatements = this.getParsedXmlIntegerAttribute(metricsNode, 'coveredstatements');
            const coveredMethods = this.getParsedXmlIntegerAttribute(metricsNode, 'coveredmethods');
            const conditionals = this.getParsedXmlIntegerAttribute(metricsNode, 'conditionals');
            const statements = this.getParsedXmlIntegerAttribute(metricsNode, 'statements');
            const methods = this.getParsedXmlIntegerAttribute(metricsNode, 'methods');

            const coveredSum = coveredConditionals + coveredStatements + coveredMethods;
            const codeSum = conditionals + statements + methods;

            const codeCoveragePercentage = codeSum > 0 ? Math.floor(100.0 * coveredSum / codeSum) : 0;

            return {
                CodeCoveragePercentage: codeCoveragePercentage,
            };
        } catch (error) {
            throw new Error('File "' + filename + '" is not a valid clover file: ' + error.message);
        }
    }

    /**
     * Parses an XML file into an object.
     *
     * @private
     *
     * @param {string} filename
     *
     * @return {Object}
     */
    parseXmlFile(filename) {
        const xmlFileContent = fs.readFileSync(filename, 'utf-8');

        let parseResult = {};
        let parseError = null;

        const xmlParser = new xml2js.Parser({'explicitArray': false});
        xmlParser.parseString(xmlFileContent, function (error, result) {
            if (error === null) {
                parseResult = result;
            } else {
                parseError = error;
            }
        })

        if (parseError !== null) {
            throw new Error('XML is invalid: ' + parseError.message);
        }

        return parseResult;
    }

    /**
     * Returns a node from parsed XML.
     *
     * @private
     *
     * @param {Object} content
     * @param {string} nodeName
     *
     * @return {Object}
     */
    getParsedXmlNode(content, nodeName) {
        if (!(nodeName in content)) {
            throw new Error('Node "<' + nodeName + '>" is missing');
        }

        return content[nodeName];
    }

    /**
     * Returns a node attribute from parsed XML.
     *
     * @private
     *
     * @param {Object} node
     * @param {string} attributeName
     *
     * @return {number}
     */
    getParsedXmlIntegerAttribute(node, attributeName) {
        const attributeValue = node['$'][attributeName];

        if (typeof attributeValue === 'undefined') {
            throw new Error('Metrics attribute "' + attributeName + '" is missing');
        }

        const attributeValueAsNumber = +attributeValue;
        if (isNaN(attributeValueAsNumber)) {
            throw new Error('Metrics attribute "' + attributeName + '" value "' + attributeValue + '" is not a number');
        }

        return attributeValueAsNumber;
    }
}

exports.CloverFileParser = CloverFileParser;
