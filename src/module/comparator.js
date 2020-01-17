import { union } from 'lodash';
import parser from './parser';
// разделители
const sepPlus = '+ ';
const sepMinus = '- ';
const septwoSpace = '  ';

const comparator = (path1, path2) => {
  const parseFile1 = parser(path1);
  const parseFile2 = parser(path2);
  const keys = union(Object.keys(parseFile1), Object.keys(parseFile2));
  const result = keys.reduce((acc, key) => {
    // совпадение значений
    if (parseFile1[key] === parseFile2[key]) {
      return `${acc}${septwoSpace}${key}: ${parseFile1[key]}\n`;
    }
    // если нет данных во втором файле
    if (parseFile2[key] === undefined) {
      return `${acc}${sepMinus}${key}: ${parseFile1[key]}\n`;
    }
    // если нет данных в первом файле
    if (parseFile1[key] === undefined) {
      return `${acc}${sepPlus}${key}: ${parseFile2[key]}\n`;
    }
    // если есть различия в значениях полей
    const newAcc = `${acc}${sepPlus}${key}: ${parseFile2[key]}\n`;
    return `${newAcc}${sepMinus}${key}: ${parseFile1[key]}\n`;
  }, '');
  return `{\n${result}}`;
};

export default comparator;
