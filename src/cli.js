const mdLinks = require('./md-links');
const { noOptions, validate, stats, validateAndStats } = require('./options');

const args = process.argv.slice(2);

const cli = (path, opt1, opt2) => {
  return new Promise = ((resolve, reject) => {
    mdLinks(path, {validate: true})
    .then(arrLinks => {
      if (opt1 === '--validate' && opt2 === '--stats') {
        resolve(validateAndStats(arrLinks));
      } else if (opt2 === '--stats' || opt2 === '--s' || opt2 === 's') {
        resolve(stats(arrLinks));
      } else if (opt1 === '--validate' || opt1 === '--v' || opt1 === 'v') {
        resolve(validate(arrLinks));
      } else {
        resolve(noOptions(arrLinks));
      }
    })
    .catch((error) => {
      reject(error);
    });
  });
};

cli(args[0], args[1], args[2])
  .then((res) => console.log(res))
  .catch((error) => console.log(error.message));
