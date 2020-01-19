import comparator from '../src/module/comparator';

const fs = require('fs');
const path = require('path');

const pathdir = '/__fixtures__/';

describe.each([
  'json',
  'yaml',
  'ini',
])('test comparator', (extensions) => {
  const resultFilePathDiff = path.join(__dirname, '/__fixtures__/result_plain');
  const expected = fs.readFileSync(resultFilePathDiff, 'utf8');

  // переделать позже. Выглядит не очень
  const beforeFilePath = path.join(__dirname, `${pathdir}before.${extensions}`);
  const afterFilePath = path.join(__dirname, `${pathdir}after.${extensions}`);
  const received = comparator(beforeFilePath, afterFilePath);

  test(`compare plain ${extensions}`, () => {
    expect(received).toEqual(expected);
  });
});
