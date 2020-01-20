// разделители
const sepPlus = '+ ';
const sepMinus = '- ';
const septwoSpace = '  ';

const mainstringify = (element, indent) => {
  if (typeof element === 'object') {
    const prefix = '{\n';
    const postfix = `\n${indent}${septwoSpace}}`;
    return Object.entries(element).reduce((acc, [key, value], index, thisArray) => {
      if (index === 0 && index === thisArray.length - 1) {
        return `${acc}${prefix}${indent}${septwoSpace.repeat(2)}${key}: ${value}${postfix}`;
      }
      if (index === 0) {
        return `${acc}${prefix}${indent}${septwoSpace.repeat(2)}${key}: ${value}\n`;
      }
      if (index === thisArray.length - 1) {
        return `${acc}${indent}${septwoSpace.repeat(2)}${key}: ${value}${postfix}`;
      }
      return `${acc}${indent}${septwoSpace.repeat(2)}${key}: ${value}`;
    }, '');
  }
  return element;
};

const runRender = (ast, indent) => {
  const result = ast.reduce((acc, { type, key, value }, index, thisArray) => {
    const newIdent = indent.repeat(2);
    // закрывающую скобку ставим после последнего элемента
    // и если value не object(иначе скобка ставится в stringifi)
    const postfix = (index === thisArray.length - 1) ? `${indent}${septwoSpace}}\n` : '';
    if (Array.isArray(value)) {
      return `${acc}${newIdent}${septwoSpace}${key}: {\n${runRender(value, newIdent)}`;
    }
    const newValue = mainstringify(value, newIdent);
    switch (type) {
      case 'noChange':
        return `${acc}${newIdent}${septwoSpace}${key}: ${newValue}\n${postfix}`;
      case 'del':
        return `${acc}${newIdent}${sepMinus}${key}: ${newValue}\n${postfix}`;
      case 'added':
        return `${acc}${newIdent}${sepPlus}${key}: ${newValue}\n${postfix}`;
      case 'change': {
        const [value1, value2] = Object.values(value);
        const firstLine = `${acc}${newIdent}${sepMinus}${key}: ${mainstringify(value1, indent.repeat(2))}\n`;
        return `${firstLine}${newIdent}${sepPlus}${key}: ${mainstringify(value2, indent.repeat(2))}\n${postfix}`;
      }
      default:
        return true;
    }
  }, '');
  return result;
};

const render = (ast) => {
  const result = runRender(ast, '  ');
  // нужно разобраться как избавиться от этого
  const postResult = result.slice(0, -2).trimRight();
  return `{\n${postResult}\n}`;
};

export default render;
