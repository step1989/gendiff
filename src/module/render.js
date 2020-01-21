// разделители
const sepPlus = '+ ';
const sepMinus = '- ';
const septwoSpace = '  ';

const getIndent = (count) => septwoSpace.repeat(count);

const stringify = (obj, countIndent) => {
  const preIndent = getIndent(countIndent);
  const postIndent = getIndent(countIndent - 2);
  const result = Object.entries(obj).reduce((acc, [key, value]) => `${acc}${preIndent}${key}: ${value}\n`, '{\n');
  return `${result}${postIndent}}`;
};

const mapper = {
  hasChildren: (acc, countIndent, key, value, runRender) => {
    const indent = `${getIndent(countIndent)}${septwoSpace}`;
    return `${acc}${indent}${key}: {\n${runRender(value, countIndent + 2)}${indent}}\n`;
  },
  noChange: (acc, countIndent, key, value) => {
    const indent = `${getIndent(countIndent)}${septwoSpace}`;
    return `${acc}${indent}${key}: ${value}\n`;
  },
  change: (acc, countIndent, key, [value1, value2]) => {
    const newValue1 = (typeof value1 === 'object') ? stringify(value1, countIndent + 2) : value1;
    const newValue2 = (typeof value2 === 'object') ? stringify(value2, countIndent + 2) : value2;
    const indent = getIndent(countIndent);
    const firstLine = `${acc}${indent}${sepMinus}${key}: ${newValue1}\n`;
    return `${firstLine}${indent}${sepPlus}${key}: ${newValue2}\n`;
  },
  added: (acc, countIndent, key, value) => {
    const newValue = (typeof value === 'object') ? stringify(value, countIndent + 2) : value;
    const indent = `${getIndent(countIndent)}${sepPlus}`;
    return `${acc}${indent}${key}: ${newValue}\n`;
  },
  del: (acc, countIndent, key, value) => {
    const newValue = (typeof value === 'object') ? stringify(value, countIndent + 2) : value;
    const indent = `${getIndent(countIndent)}${sepMinus}`;
    return `${acc}${indent}${key}: ${newValue}\n`;
  },

};

const runRender = (ast, countIndent) => {
  const result = ast.reduce((acc, { type, key, value }) => mapper[type](acc, countIndent, key, value, runRender), '');
  return result;
};

const render = (ast) => {
  const result = runRender(ast, 1);
  return `{\n${result.trimRight()}\n}`;
};

export default render;
