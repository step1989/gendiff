import path from 'path';
import parse from './parsers';
import reader from './reader';
import getAst from './astBuilder';
import render from './formatters';

const gendiff = (path1, path2, format) => {
  const fileExtension1 = path.extname(path1).slice(1);
  const fileExtension2 = path.extname(path2).slice(1);
  const data1 = reader(path1);
  const data2 = reader(path2);
  const obj1 = parse(data1, fileExtension1);
  const obj2 = parse(data2, fileExtension2);
  const ast = getAst(obj1, obj2);
  return render(ast, format);
};

export default gendiff;
