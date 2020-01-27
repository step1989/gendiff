const prefAdd = '+ ';
const prefDel = '- ';
const prefNoChange = '  ';

const startDepth = 1;

const getIndent = (depth) => prefNoChange.repeat(depth);

const stringifyObject = (obj, depth) => {
  const preIndent = getIndent(depth);
  const postIndent = getIndent(depth - 2);
  const strings = Object.entries(obj).map(([key, value]) => `${preIndent}${key}: ${value}\n`);
  return `{\n${strings.join('')}${postIndent}}`;
};

const stringify = (key, value, depth, prefix = prefNoChange) => {
  const indent = `${getIndent(depth)}`;
  const newValue = (typeof value === 'object') ? stringifyObject(value, depth + 2) : value;
  return `${indent}${prefix}${key}: ${newValue}\n`;
};

const mapper = {
  hasChildren: (depth, { key, children }, getStrings) => {
    const postfix = `${getIndent(depth)}${prefNoChange}`;
    const value = `{\n${getStrings(children, depth + 2).join('')}${postfix}}`;
    return stringify(key, value, depth);
  },
  noChanged: (depth, { key, value }) => stringify(key, value, depth),
  changed: (depth, { key, value: values }) => values.map((value, index) => {
    const prefix = index === 0 ? prefDel : prefAdd;
    return stringify(key, value, depth, prefix);
  }).join(''),
  added: (depth, { key, value }) => stringify(key, value, depth, prefAdd),
  deleted: (depth, { key, value }) => stringify(key, value, depth, prefDel),
};

const getStrings = (ast, depth) => ast.map((node) => mapper[node.type](depth, node, getStrings));

const runPrettyFormatter = (ast) => `{\n${getStrings(ast, startDepth).join('')}}`;

export default runPrettyFormatter;
