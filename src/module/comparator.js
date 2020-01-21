import parser from './parser';
import reader from './reader';
import astBuilder from './astBuilder';
import render from './render';

const path = require('path');


const comparator = (path1, path2, format) => {
  // вопрос для обсуждения с ментором. Необходимо ли для каждого файла
  // получать расширение
  const fileExtension = path.extname(path1).slice(1);
  const data1 = reader(path1);
  const data2 = reader(path2);
  const obj1 = parser(data1, fileExtension);
  const obj2 = parser(data2, fileExtension);
  const ast = astBuilder(obj1, obj2);
  const print = render(ast);
  return print;
};

export default comparator;
