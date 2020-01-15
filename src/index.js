import commander from 'commander';
import { has, difference } from 'lodash';
const fs = require('fs');
const path = require('path')

// разделители
const sepPlus = '+ ';
const sepMinus = '- ';
const septwoSpace = '  ';

const gendiff = () => {
	const program = require('commander');
	program.version('1.0.0')
		.description('Compares two configuration files and shows a difference.')
		.option('-f, --format [type]			output format')
		.arguments('<firstConfig>')
		.arguments('<secondConfig>')
		.action((firstConfig, secondConfig) => {
			compare(firstConfig, secondConfig);
		})
		.parse(process.argv);
};

const compare = (path1, path2) => {
	const datafile1 = readFile(path1);
	const datafile2 = readFile(path2);
	const file1 = JSON.parse(datafile1);
	const file2 = JSON.parse(datafile2);
	const keys1 = Object.keys(file1);
	const keys2 = Object.keys(file2);
	const keysOnlyAfter = difference(keys2, keys1);
	const resultExDateOnlyAfter = keys1.reduce((acc, key) => {
		// совпадение значений
		if (file1[key] === file2[key]) {
			acc[`${septwoSpace}${key}`] = file1[key];
		// если нет данных во втором файле 
		} else if (file2[key] === undefined) {
			acc[`${sepMinus}${key}`] = file1[key];
		// если есть различия в значениях полей
		} else {
			acc[`${sepPlus} ${key}`] = file2[key];
			acc[`${sepMinus} ${key}`] = file1[key];
		}
		return acc;
	}, {});
	const result = keysOnlyAfter.reduce((acc, key) => {
		acc[`${sepPlus} ${key}`] = file2[key];
		return acc;
	}, resultExDateOnlyAfter);
	console.log(result);
}

const readFile = (pathfile) => {
	try {
		fs.accessSync(pathfile);
	} catch (err) {
		console.error('file or directory not found or not acces');
		return;
	}
	const data = fs.readFileSync(pathfile, 'utf8');
	return data;
};

export default gendiff;
