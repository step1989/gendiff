import runPlainFormmater from './formatters/plain';
import runPrettyFormmater from './formatters/pretty';

const mapper = {
  plain: (data) => runPlainFormmater(data),
  pretty: (data) => runPrettyFormmater(data),
  json: (data) => JSON.stringify(data, null, 1),
};

const render = (ast, format) => mapper[format](ast);

export default render;
