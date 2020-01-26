const prefAdd = '+ ';
const prefDel = '- ';
const prefNoChange = '  ';

const startCountIndent = 1;

const getIndent = (count) => prefNoChange.repeat(count);

const stringify = (obj, countIndent) => {
  const preIndent = getIndent(countIndent);
  const postIndent = getIndent(countIndent - 2);
  const result = Object.entries(obj).reduce((acc, [key, value]) => `${acc}${preIndent}${key}: ${value}\n`, '{\n');
  return `${result}${postIndent}}`;
};

const mapper = {
  hasChildren: (acc, countIndent, key, value, prettyFormatter) => {
    const indent = `${getIndent(countIndent)}${prefNoChange}`;
    return `${acc}${indent}${key}: {\n${prettyFormatter(value, countIndent + 2)}${indent}}\n`;
  },
  noChanged: (acc, countIndent, key, value) => {
    const indent = `${getIndent(countIndent)}${prefNoChange}`;
    return `${acc}${indent}${key}: ${value}\n`;
  },
  changed: (acc, countIndent, key, [value1, value2]) => {
    const newValue1 = (typeof value1 === 'object') ? stringify(value1, countIndent + 2) : value1;
    const newValue2 = (typeof value2 === 'object') ? stringify(value2, countIndent + 2) : value2;
    const indent = getIndent(countIndent);
    const firstLine = `${acc}${indent}${prefDel}${key}: ${newValue1}\n`;
    return `${firstLine}${indent}${prefAdd}${key}: ${newValue2}\n`;
  },
  added: (acc, countIndent, key, value) => {
    const newValue = (typeof value === 'object') ? stringify(value, countIndent + 2) : value;
    const indent = `${getIndent(countIndent)}${prefAdd}`;
    return `${acc}${indent}${key}: ${newValue}\n`;
  },
  deleted: (acc, countIndent, key, value) => {
    const newValue = (typeof value === 'object') ? stringify(value, countIndent + 2) : value;
    const indent = `${getIndent(countIndent)}${prefDel}`;
    return `${acc}${indent}${key}: ${newValue}\n`;
  },
};

const prettyFormatter = (ast, countIndent) => ast.reduce((acc, { type, key, value }) => {
  const formatter = mapper[type](acc, countIndent, key, value, prettyFormatter);
  return formatter;
}, '');

const runPrettyFormatter = (ast) => `{\n${prettyFormatter(ast, startCountIndent)}}`;

export default runPrettyFormatter;
