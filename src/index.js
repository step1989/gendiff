import { difference } from 'lodash';

const fs = require('fs');
const program = require('commander');
// const path = require('path')

// разделители
const sepPlus = '+ ';
const sepMinus = '- ';
const septwoSpace = '  ';

const readFile = (pathfile) => {
  try {
    fs.accessSync(pathfile);
  } catch (err) {
    console.error('file or directory not found or not acces');
    return err;
  }
  const data = fs.readFileSync(pathfile, 'utf8');
  return data;
};

const compare = (path1, path2) => {
  const datafile1 = readFile(path1);
  const datafile2 = readFile(path2);
  const file1 = JSON.parse(datafile1);
  const file2 = JSON.parse(datafile2);
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const keysOnlyAfter = difference(keys2, keys1);
  const resultExDateOnlyAfter = keys1.reduce((acc, key) => {
    // совпадение значений
    if (file1[key] === file2[key]) {
      return `${acc}${septwoSpace}${key}: ${file1[key]}\n`;
    }
    // если нет данных во втором файле
    if (file2[key] === undefined) {
      return `${acc}${sepMinus}${key}: ${file1[key]}\n`;
    }
    // если есть различия в значениях полей
    const newAcc = `${acc}${sepPlus}${key}: ${file2[key]}\n`;
    return `${newAcc}${sepMinus}${key}: ${file1[key]}\n`;
  }, '');
  const result = keysOnlyAfter.reduce((acc, key) => `${acc}${sepPlus}${key}: ${file2[key]}\n`, resultExDateOnlyAfter);
  return `{\n${result}}`;
};

const gendiff = () => {
  program.version('1.0.0')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]  output format')
    .arguments('<firstConfig>')
    .arguments('<secondConfig>')
    .action((firstConfig, secondConfig) => {
      console.log(compare(firstConfig, secondConfig));
    })
    .parse(process.argv);
};

export { gendiff, compare };
