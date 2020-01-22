import fs from 'fs';
import path from 'path';
import gendiff from '../src';

const pathdir = '/__fixtures__/tree/';

describe.each(['pretty', 'plain', 'json'])('test %s output format', (outputFormat) => {
  const expectedPath = path.join(__dirname, `${pathdir}${outputFormat}`);
  const expected = fs.readFileSync(expectedPath, 'utf8');

  describe.each(['json', 'ini', 'yaml'])('test gendiff', (extensions) => {
    const beforeFilePath = path.join(__dirname, `${pathdir}before.${extensions}`);
    const afterFilePath = path.join(__dirname, `${pathdir}after.${extensions}`);
    const received = gendiff(beforeFilePath, afterFilePath, outputFormat);

    test(`Test compare ${extensions} file.`, () => {
      expect(received).toEqual(expected);
    });
  });
});
