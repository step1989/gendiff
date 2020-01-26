import yaml from 'js-yaml';
import ini from 'ini';

const mapper = {
  json: JSON.parse,
  yaml: yaml.safeLoad,
  ini: ini.parse,
};

const parse = (data, type) => mapper[type](data);

export default parse;
