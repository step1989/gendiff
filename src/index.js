import comparator from './module/comparator';

const program = require('commander');

const gendiff = () => {
  program.version('1.0.0')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]  output format')
    .arguments('<firstConfig>')
    .arguments('<secondConfig>')
    .action((firstConfig, secondConfig) => {
      console.log(comparator(firstConfig, secondConfig));
    })
    .parse(process.argv);
};

export default gendiff;
