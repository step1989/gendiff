#!/usr/bin/env nodejs
import commander from 'commander'; 

const program = require('commander');
program
	.version('1.0.0')
	.description('Compares two configuration files and shows a difference.')
	.parse(process.argv);