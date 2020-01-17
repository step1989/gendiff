import yaml from 'js-yaml';
import reader from './reader';

const path = require('path');

const mapper = {
  json: (data) => JSON.parse(data),
  yaml: (data) => yaml.safeLoad(data),
};

const parser = (filepath) => {
  const fileExtension = path.extname(filepath).slice(1);
  return mapper[fileExtension](reader(filepath));
};

export default parser;
