const mdLinks = require('./mdLinks');
const argv = require('./yargs').argv;

const path = argv._[0];
//console.log(argv.validate);

if (argv.validate === undefined) {
  mdLinks(path).then(arrLinks => {
    arrLinks.forEach(obj => console.log(`${obj.file} ${obj.href} ${obj.text}`));
  });
} else {
  mdLinks(path, {validate: true}).then(arrPromise => {
    arrPromise.forEach(promise => promise.then((obj) => (
    console.log(`${obj.file} ${obj.href} ${obj.message} ${obj.status} ${obj.text}`)
    )));
  });
};
