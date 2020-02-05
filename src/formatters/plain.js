import { flattenDeep } from 'lodash';

const stringify = (value) => (typeof value === 'object' ? '[complex value]' : value);

const mapper = {
  hasChildren: (path, { children }, getStrings) => getStrings(children, `${path}.`),
  noChanged: () => null,
  changed: (path, { valueBefore, valueAfter }) => {
    const convertedValueBefore = stringify(valueBefore);
    const convertedValueAfter = stringify(valueAfter);
    return `Property '${path}' was updated. From ${convertedValueBefore} to ${convertedValueAfter}`;
  },
  added: (path, { value }) => {
    const checkedValue = stringify(value);
    return `Property '${path}' was added with value: ${checkedValue}`;
  },
  deleted: (path) => `Property '${path}' was removed`,
};

const getStrings = (ast, parentPath = '') => ast.map((node) => {
  const path = `${parentPath}${node.key}`;
  return mapper[node.type](path, node, getStrings);
});

const runPlainFormatter = (ast) => {
  const strings = flattenDeep(getStrings(ast));
  return strings.filter((el) => el !== null).join('\n');
};

export default runPlainFormatter;
