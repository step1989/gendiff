import yaml from 'js-yaml';
import ini from 'ini';

const mapper = {
  json: (data) => JSON.parse(data),
  yaml: (data) => yaml.safeLoad(data),
  ini: (data) => ini.parse(data),
};

const parser = (data, fileExtension) => mapper[fileExtension](data);

export default parser;
