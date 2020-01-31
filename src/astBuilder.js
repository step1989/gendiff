import {
  union, has, get,
} from 'lodash';

const getAst = (obj1, obj2) => {
  const keys = union(Object.keys(obj1), Object.keys(obj2));
  const ast = keys.map((key) => {
    if (!has(obj1, key)) {
      return { type: 'added', key, value: get(obj2, key) };
    }

    if (!has(obj2, key)) {
      return { type: 'deleted', key, value: get(obj1, key) };
    }

    const value1 = get(obj1, key);
    const value2 = get(obj2, key);
    if (typeof value1 === 'object' && typeof value2 === 'object') {
      return { type: 'hasChildren', key, children: getAst(value1, value2) };
    }

    if (value1 === value2) {
      return { type: 'noChanged', key, value: value1 };
    }

    return { type: 'changed', key, value: [value1, value2] };
  });
  return ast;
};

export default getAst;
