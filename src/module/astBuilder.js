import {
  union, has, get,
} from 'lodash';

const astBuilder = (obj1, obj2) => {
  const keys = union(Object.keys(obj1), Object.keys(obj2));
  const result = keys.map((key) => {
    // если нет данных в первом файле
    if (!has(obj1, key)) {
      return { type: 'added', key, value: get(obj2, key) };
    }
    // если нет данных во втором файле
    if (!has(obj2, key)) {
      return { type: 'del', key, value: get(obj1, key) };
    }
    const value1 = get(obj1, key);
    const value2 = get(obj2, key);
    // проверим что оба значения = объекты
    if (typeof value1 === 'object' && typeof value2 === 'object') {
      return { type: 'noChange', key, value: astBuilder(value1, value2) };
    // если типы не равны. Сравниваем значения
    }
    if (value1 === value2) {
      return { type: 'noChange', key, value: value1 };
    }
    return { type: 'change', key, value: { value1, value2 } }; // была проба с массивом
  });
  return result;
};

export default astBuilder;
