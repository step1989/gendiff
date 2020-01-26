import runPlainFormatter from './plain';
import runPrettyFormatter from './pretty';

const mapper = {
  plain: (data) => runPlainFormatter(data),
  pretty: (data) => runPrettyFormatter(data),
  json: (data) => JSON.stringify(data, null, 1),
};

const render = (ast, format) => mapper[format](ast);

export default render;
