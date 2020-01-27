const mapper = {
  hasChildren: (path, { children }, getStrings) => `${getStrings(children, `${path}.`).join('')}`,
  noChanged: () => '',
  changed: (path, { value: values }) => {
    const [valueBefore, valueAfter] = values;
    const checkValueBefore = (typeof valueBefore === 'object') ? '[complex value]' : valueBefore;
    const checkValueAfter = (typeof valueAfter === 'object') ? '[complex value]' : valueAfter;
    return `Property '${path}' was updated. From ${checkValueBefore} to ${checkValueAfter}\n`;
  },
  added: (path, { value }) => {
    const checkValue = (typeof value === 'object') ? '[complex value]' : value;
    return `Property '${path}' was added with value: ${checkValue}\n`;
  },
  deleted: (path) => `Property '${path}' was removed\n`,
};

const getStrings = (ast, parentPath = '') => ast.map((node) => {
  const path = `${parentPath}${node.key}`;
  return mapper[node.type](path, node, getStrings);
});

const runPlainFormatter = (ast) => getStrings(ast).join('').trim();

export default runPlainFormatter;
