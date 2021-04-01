const application = require('../src/application');

test('Run application with invalid report file', () => {
    expect(() => {
        new application.Application().run('./test/reports/clover-invalid-2.xml', 50);
    }).toThrow('File "./test/reports/clover-invalid-2.xml" is not a valid clover file: Node "<coverage>" is missing');
});

test('Run application with code coverage less than required', () => {
    const result = new application.Application().run('./test/reports/clover-partial-coverage.xml', 90);

    expect(result.isSuccess).toBe(false);
    expect(result.message).toBe('Code coverage is 63%, required code coverage is 90%');
});

test('Run application with code coverage equal to required', () => {
    const result = new application.Application().run('./test/reports/clover-partial-coverage.xml', 63);

    expect(result.isSuccess).toBe(true);
    expect(result.message).toBe('Code coverage is 63%, required code coverage is 63%');
});

test('Run application with code coverage greater than required', () => {
    const result = new application.Application().run('./test/reports/clover-partial-coverage.xml', 50);

    expect(result.isSuccess).toBe(true);
    expect(result.message).toBe('Code coverage is 63%, required code coverage is 50%');
});
