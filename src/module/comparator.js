import { union } from 'lodash';
import parser from './parser';
import reader from './reader';

const path = require('path');

// разделители
const sepPlus = '+ ';
const sepMinus = '- ';
const septwoSpace = '  ';

const comparator = (path1, path2) => {
  // вопрос для обсуждения с ментором. Необходимо ли для каждого файла
  // получать расширение
  const fileExtension = path.extname(path1).slice(1);
  const data1 = reader(path1);
  const data2 = reader(path2);
  const obj1 = parser(data1, fileExtension);
  const obj2 = parser(data2, fileExtension);
  const keys = union(Object.keys(obj1), Object.keys(obj2));
  const compare = keys.reduce((acc, key) => {
    // совпадение значений
    // ознакомится с функциями lodash. Переделать на них
    if (obj1[key] === obj2[key]) {
      return `${acc}${septwoSpace}${key}: ${obj1[key]}\n`;
    }
    // если нет данных во втором файле
    if (obj2[key] === undefined) {
      return `${acc}${sepMinus}${key}: ${obj1[key]}\n`;
    }
    // если нет данных в первом файле
    if (obj1[key] === undefined) {
      return `${acc}${sepPlus}${key}: ${obj2[key]}\n`;
    }
    // если есть различия в значениях полей
    const newAcc = `${acc}${sepPlus}${key}: ${obj2[key]}\n`;
    return `${newAcc}${sepMinus}${key}: ${obj1[key]}\n`;
  }, '');
  return `{\n${compare}}`;
};

export default comparator;
