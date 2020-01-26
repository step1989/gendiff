import fs from 'fs';
import path from 'path';
import gendiff from '../src';

const pathdir = '/__fixtures__/tree/';

const getPathFile = (fileName, extension = 'txt') => path.join(__dirname, `${pathdir}${fileName}.${extension}`);

describe.each(['pretty', 'plain', 'json'])('test %s output format', (outputFormat) => {
  const resultFileName = outputFormat;
  const expectedPath = getPathFile(resultFileName);
  const expected = fs.readFileSync(expectedPath, 'utf8');

  describe.each(['json', 'ini', 'yaml'])('test gendiff', (extension) => {
    const beforeFilePath = getPathFile('before', extension);
    const afterFilePath = getPathFile('after', extension);
    const received = gendiff(beforeFilePath, afterFilePath, outputFormat);

    test(`Test compare ${extension} file.`, () => {
      expect(received).toEqual(expected);
    });
  });
});
