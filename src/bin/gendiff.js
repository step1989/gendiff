#!/usr/bin/env nodejs

import program from 'commander';
import gendiff from '..';

program.version('1.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format (pretty, plain, json). Default output pretty', 'pretty')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig, option) => {
    console.log(gendiff(firstConfig, secondConfig, option.format));
  })
  .parse(process.argv);
