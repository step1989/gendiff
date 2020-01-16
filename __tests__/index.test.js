import { compare } from '../src';

const fs = require('fs');
const path = require('path');

test('compare plain json', () => {
  const resultFilePath = path.join(__dirname, '/__fixtures__/result_plain_json');
  const beforeFilePath = path.join(__dirname, '/__fixtures__/before.json');
  const afterFilePath = path.join(__dirname, '/__fixtures__/after.json');
  const result = fs.readFileSync(resultFilePath, 'utf8');
  expect(compare(beforeFilePath, afterFilePath)).toEqual(result);
});
