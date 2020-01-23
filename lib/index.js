const mdLinks = require('./mdLinks');
const argv = require('yargs').argv;
const path = argv._[0];
console.log(argv);
mdLinks(path, {});