import program from 'commander';
import gendiff from './index';
import { version } from '../package.json';

const mapper = {
  EISDIR: (filepath) => console.log(`error: "${filepath}" is a folder`),
  ENOENT: (filepath) => console.log(`error: "${filepath}" - no such file or not acces`),
};

const run = () => {
  program.version(version)
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format (pretty, plain, json). Default output pretty', 'pretty')
    .arguments('<firstConfig> <secondConfig>')
    .action((firstConfig, secondConfig, option) => {
      try {
        console.log(gendiff(firstConfig, secondConfig, option.format));
      } catch (e) {
        mapper[e.code](e.path);
        process.exit(-1);
      }
    })
    .parse(process.argv);
};


export default run;
