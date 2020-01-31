import { flattenDeep } from 'lodash';

const checkObject = (value) => (typeof value === 'object' ? '[complex value]' : value);

const mapper = {
  hasChildren: (path, { children }, getStrings) => getStrings(children, `${path}.`),
  noChanged: () => '',
  changed: (path, { value: values }) => {
    const [checkedBefore, checkedAfter] = values.map((value) => checkObject(value));
    return `Property '${path}' was updated. From ${checkedBefore} to ${checkedAfter}`;
  },
  added: (path, { value }) => {
    const checkedValue = checkObject(value);
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
  return strings.filter((el) => el !== '').join('\n');
};

export default runPlainFormatter;
