# Check code coverage

[![tests](https://github.com/themichaelhall/check-code-coverage/actions/workflows/tests.yml/badge.svg)](https://github.com/themichaelhall/check-code-coverage/actions/workflows/tests.yml)

This GitHub action reads a code coverage report and fails if the actual code coverage is below a specified threshold.

## Inputs

### `report`

**Required** The name of the code coverage report file. Only reports in clover format are supported.

### `required-percentage`

**Required** The code coverage in percent (0-100) required to pass.

## Example usage

```yml
uses: themichaelhall/check-code-coverage@v1
with:
  report: coverage.xml
  required-percentage: 80
```

## License

MIT
