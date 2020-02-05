import program from 'commander';
import gendiff from './index';

const mapper = {
  EISDIR: (pathfile) => console.log(`error: "${pathfile}" is a folder`),
  ENOENT: (pathfile) => console.log(`error: "${pathfile}" - no such file or not acces`),
};

const run = () => {
  program.version('1.0.2')
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
