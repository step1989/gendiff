import runPlainFormmater from './formatters/plain';
import runPrettyFormmater from './formatters/pretty';

const mapper = {
  plain: (ast) => runPlainFormmater(ast),
  pretty: (ast) => runPrettyFormmater(ast),
};

const render = (ast, format) => mapper[format](ast);

export default render;
