const mapper = {
  hasChildren: (acc, path, ast, plainFormmater) => `${acc}${plainFormmater(ast, `${path}.`)}`,
  noChange: (acc) => `${acc}`,
  change: (acc, path, [value1, value2]) => {
    const newValue1 = (typeof value1 === 'object') ? '[complex value]' : value1;
    const newValue2 = (typeof value2 === 'object') ? '[complex value]' : value2;
    return `${acc}Property '${path}' was updated. From ${newValue1} to ${newValue2}\n`;
  },
  added: (acc, path, value) => {
    const newValue = (typeof value === 'object') ? '[complex value]' : value;
    return `${acc}Property '${path}' was added with value: ${newValue}\n`;
  },
  del: (acc, path) => `${acc}Property '${path}' was removed\n`,
};

const plainFormmater = (ast, parent = '') => ast.reduce((acc, { type, key, value }) => {
  const currentRoot = `${parent}${key}`;
  return mapper[type](acc, currentRoot, value, plainFormmater);
}, '');

const runPlainFormmater = (ast) => plainFormmater(ast, '').trim();

export default runPlainFormmater;
