const fileParsers = require('../src/fileParsers');

test('Read clover code coverage from non-existing file', () => {
    const cloverFileParser = new fileParsers.CloverFileParser();

    expect(() => {
        cloverFileParser.parseFile('./test/foo.xml');
    }).toThrow('Could not find file "./test/foo.xml"');
});

test('Read clover code coverage from an invalid file #1', () => {
    const cloverFileParser = new fileParsers.CloverFileParser();

    expect(() => {
        cloverFileParser.parseFile('./test/clover-invalid-1.txt');
    }).toThrow("File \"./test/clover-invalid-1.txt\" is not a valid clover file: XML is invalid: Non-whitespace before first tag.\nLine: 0\nColumn: 1\nChar: H");
});

test('Read clover code coverage from an invalid file #2', () => {
    const cloverFileParser = new fileParsers.CloverFileParser();

    expect(() => {
        cloverFileParser.parseFile('./test/clover-invalid-2.xml');
    }).toThrow('File "./test/clover-invalid-2.xml" is not a valid clover file: Node "<coverage>" is missing');
});

// fixme: Invalid with invalid parameter type
// fixme: File with 0% coverage
// fixme: File with partial coverage

test('Read clover code coverage from a file with full coverage', () => {
    const cloverFileParser = new fileParsers.CloverFileParser();
    const result = cloverFileParser.parseFile('./test/clover-full-coverage.xml');

    expect(result.CodeCoveragePercentage).toBe(100);
});
