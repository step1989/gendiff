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

    const valueBefore = get(obj1, key);
    const valueAfter = get(obj2, key);
    if (typeof valueBefore === 'object' && typeof valueAfter === 'object') {
      return { type: 'hasChildren', key, children: getAst(valueBefore, valueAfter) };
    }

    if (valueBefore === valueAfter) {
      return { type: 'noChanged', key, value: valueBefore };
    }

    return {
      type: 'changed', key, valueBefore, valueAfter,
    };
  });
  return ast;
};

export default getAst;
