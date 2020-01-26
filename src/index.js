import path from 'path';
import parser from './parsers';
import reader from './reader';
import astBuilder from './astBuilder';
import render from './formatters';

const gendiff = (path1, path2, format = 'pretty') => {
  const fileExtension1 = path.extname(path1).slice(1);
  const fileExtension2 = path.extname(path2).slice(1);
  const data1 = reader(path1);
  const data2 = reader(path2);
  const obj1 = parser(data1, fileExtension1);
  const obj2 = parser(data2, fileExtension2);
  const ast = astBuilder(obj1, obj2);
  return render(ast, format);
};

export default gendiff;
