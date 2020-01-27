import runPlainFormatter from './plain';
import runPrettyFormatter from './pretty';

const mapper = {
  plain: runPlainFormatter,
  pretty: runPrettyFormatter,
  json: JSON.stringify,
};

const render = (ast, format) => mapper[format](ast);

export default render;
