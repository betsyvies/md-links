const mdLinks = require('./mdLinks');
const argv = require('./yargs').argv;

const path = argv._[0];
console.log(argv.validate);
if (argv.validate) {
  mdLinks(path, {validate: true})
} else {
  mdLinks(path, {})
};
