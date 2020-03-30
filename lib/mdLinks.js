const fs = require('fs');
const { validate, stats } = require('./options');
const { 
  getKey,
  getLinks,
  getTextLink,
  getHref,
} = require('./help');

module.exports = (path, options) => {
  let option = undefined;
  if (options !== undefined) {
    option = getKey(options);
  }
  return readFile(path, option)
  .then(getArrOrString)
  .catch((error) => {
    console.log('Hubo un problema con la petición:' + error.message);
  });
};

const getArrOrString = (datatype) => {
  if(typeof datatype === 'string') {
    return datatype
  }
  return Promise.all(datatype);
}
const readFile = (path, option) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, data) => {
      if(err) {
        reject(err);
      } else {
        const arrURL = getLinks(data);
        const arrInfoLinks = getArrLinks(arrURL, option, path);
        if (option === 'stats' || option === 'both') {
          resolve(stats(arrInfoLinks))
        }
        resolve(arrInfoLinks);
      }
    });
  });
};

const getArrLinks = (arr, option, path) => (
  arr.map((elem) => {
    const obj = {
      href: getHref(elem),
      text: getTextLink(elem),
      file: path,
    };
    if (option !== 'stats' && option !== undefined) {
      return validate(obj)
    }
    return obj
  })
);
