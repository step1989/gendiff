import path from 'path';
import fs from 'fs';
import parse from './parsers';
import getAst from './astBuilder';
import render from './formatters';

const readFile = (pathfile) => fs.readFileSync(pathfile, 'utf8');

const gendiff = (path1, path2, format) => {
  const fileExtension1 = path.extname(path1).slice(1);
  const fileExtension2 = path.extname(path2).slice(1);
  const data1 = readFile(path1);
  const data2 = readFile(path2);
  const obj1 = parse(data1, fileExtension1);
  const obj2 = parse(data2, fileExtension2);
  const ast = getAst(obj1, obj2);
  return render(ast, format);
};

export default gendiff;
