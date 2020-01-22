import gendiff from '../src';

const fs = require('fs');
const path = require('path');

const pathdir = '/__fixtures__/tree/';

describe.each(['pretty', 'plain', 'json'])('test %s format', (outputFormat) => {
  describe.each(['json', 'ini', 'yaml'])('test comparator', (extensions) => {
    const expectedPath = path.join(__dirname, `${pathdir}${outputFormat}`);
    const expected = fs.readFileSync(expectedPath, 'utf8');
    const beforeFilePath = path.join(__dirname, `${pathdir}before.${extensions}`);
    const afterFilePath = path.join(__dirname, `${pathdir}after.${extensions}`);
    const received = gendiff(beforeFilePath, afterFilePath, outputFormat);

    test(`Test compare ${extensions} file. Return ${outputFormat}`, () => {
      expect(received).toEqual(expected);
    });
  });
});
