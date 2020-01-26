import runPlainFormatter from './plain';
import runPrettyFormatter from './pretty';

const mapper = {
  plain: runPlainFormatter,
  pretty: runPrettyFormatter,
  json: (data) => JSON.stringify(data),
};

const render = (ast, format) => mapper[format](ast);

export default render;
