import comparator from '../src/module/comparator';

const fs = require('fs');
const path = require('path');

describe('compare plain json', () => {
  test('have a diff', () => {
    const resultFilePath = path.join(__dirname, '/__fixtures__/result_plain');
    const beforeFilePath = path.join(__dirname, '/__fixtures__/before.json');
    const afterFilePath = path.join(__dirname, '/__fixtures__/after.json');
    const receive = fs.readFileSync(resultFilePath, 'utf8');
    expect(comparator(beforeFilePath, afterFilePath)).toEqual(receive);
  });
  test('not have a diff', () => {
    const resultFilePath = path.join(__dirname, '/__fixtures__/not_diff_plain_json/result_plain');
    const beforeFilePath = path.join(__dirname, '/__fixtures__/not_diff_plain_json/before.json');
    const afterFilePath = path.join(__dirname, '/__fixtures__/not_diff_plain_json/after.json');
    const receive = fs.readFileSync(resultFilePath, 'utf8');
    expect(comparator(beforeFilePath, afterFilePath)).toEqual(receive);
  });
});
describe('compare plain YAML', () => {
  test('have a diff', () => {
    const resultFilePath = path.join(__dirname, '/__fixtures__/result_plain');
    const beforeFilePath = path.join(__dirname, '/__fixtures__/before.yaml');
    const afterFilePath = path.join(__dirname, '/__fixtures__/after.yaml');
    const receive = fs.readFileSync(resultFilePath, 'utf8');
    expect(comparator(beforeFilePath, afterFilePath)).toEqual(receive);
  });
  test('not have a diff', () => {
    const resultFilePath = path.join(__dirname, '/__fixtures__/not_diff_plain_json/result_plain');
    const beforeFilePath = path.join(__dirname, '/__fixtures__/not_diff_plain_json/before.yaml');
    const afterFilePath = path.join(__dirname, '/__fixtures__/not_diff_plain_json/after.yaml');
    const receive = fs.readFileSync(resultFilePath, 'utf8');
    expect(comparator(beforeFilePath, afterFilePath)).toEqual(receive);
  });
});
