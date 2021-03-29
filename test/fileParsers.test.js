const fileParsers = require('../src/fileParsers');

test('Read clover code coverage from non-existing file', () => {
    const cloverFileParser = new fileParsers.CloverFileParser();

    expect(() => {
        cloverFileParser.parseFile('./test/foo.xml');
    }).toThrow('Could not find file "./test/foo.xml"');
});

test('Read clover code coverage from valid file', () => {
    const cloverFileParser = new fileParsers.CloverFileParser();
    const result = cloverFileParser.parseFile('./test/test.xml');

    expect(result.CodeCoveragePercentage).toBe(50);
});
