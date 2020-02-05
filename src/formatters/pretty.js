const prefAdd = '+ ';
const prefDel = '- ';
const prefNoChange = '  ';

const startDepth = 1;

const getIndent = (depth) => prefNoChange.repeat(depth);

const stringifyObject = (obj, depth) => {
  const preIndent = getIndent(depth);
  const postIndent = `${getIndent(depth - 2)}}`;
  const strings = Object.entries(obj).map(([key, value]) => `${preIndent}${key}: ${value}`);
  return `{\n${strings.join('\n')}\n${postIndent}`;
};

const stringify = (key, value, depth, prefix = prefNoChange) => {
  const indent = `${getIndent(depth)}`;
  const checkedValue = (typeof value === 'object') ? stringifyObject(value, depth + 2) : value;
  return `${indent}${prefix}${key}: ${checkedValue}`;
};

const mapper = {
  hasChildren: (depth, { key, children }, getStrings) => {
    const postfix = `${getIndent(depth)}${prefNoChange}}`;
    const value = `{\n${getStrings(children, depth + 2).join('\n')}\n${postfix}`;
    return stringify(key, value, depth);
  },
  noChanged: (depth, { key, value }) => stringify(key, value, depth),
  changed: (depth, { key, valueBefore, valueAfter }) => {
    const lineDel = mapper.deleted(depth, { key, value: valueBefore });
    const lineAdd = mapper.added(depth, { key, value: valueAfter });
    return [lineDel, lineAdd].join('\n');
  },
  added: (depth, { key, value }) => stringify(key, value, depth, prefAdd),
  deleted: (depth, { key, value }) => stringify(key, value, depth, prefDel),
};

const getStrings = (ast, depth) => ast.map((node) => mapper[node.type](depth, node, getStrings));

const runPrettyFormatter = (ast) => `{\n${getStrings(ast, startDepth).join('\n')}\n}`;


export default runPrettyFormatter;
