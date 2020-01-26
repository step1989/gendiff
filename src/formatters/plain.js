const mapper = {
  hasChildren: (acc, path, value, plainFormatter, children) => `${acc}${plainFormatter(children, `${path}.`)}`,
  noChanged: (acc) => `${acc}`,
  changed: (acc, path, [value1, value2]) => {
    const newValue1 = (typeof value1 === 'object') ? '[complex value]' : value1;
    const newValue2 = (typeof value2 === 'object') ? '[complex value]' : value2;
    return `${acc}Property '${path}' was updated. From ${newValue1} to ${newValue2}\n`;
  },
  added: (acc, path, value) => {
    const newValue = (typeof value === 'object') ? '[complex value]' : value;
    return `${acc}Property '${path}' was added with value: ${newValue}\n`;
  },
  deleted: (acc, path) => `${acc}Property '${path}' was removed\n`,
};

const plainFormatter = (ast, parentPath = '') => ast.reduce((acc, {
  type, key, value, children,
}) => {
  const path = `${parentPath}${key}`;
  return mapper[type](acc, path, value, plainFormatter, children);
}, '');

const runPlainFormatter = (ast) => plainFormatter(ast).trim();

export default runPlainFormatter;
