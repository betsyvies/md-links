const fs = require('fs');
const http = require('http');
const https = require('https');
const validate = require('./options/options').validate;

module.exports = (path, options) => {
  return new Promise((resolve, reject) => {
    // Llamamos a resolve(...) cuando lo que estabamos haciendo finaliza con éxito, y reject(...) cuando falla.
    if (options === undefined) {
      resolve(readFile(path).then((arr) => arr));
    } else {
      resolve(readFile(path).then((arr) => {
        return arr.map((elem) => {
          const protocol = getProtocol(getProtocolString(elem.href));
          return validate(protocol, elem)
        });
      }));
    }
  })
};

const readFile = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, data) => {
      if(err) {
        reject(err);
      } else {
        const expreRegular = /\[\w.+/g;
        const arrURL = data.toString().match(expreRegular);
        resolve(arrURL.map((elem) => {
          return {
            href: getHref(elem),
            text: getTextLink(elem),
            file: path,
          };
        }));
      }
    });
  });
}

const getTextLink = (link) => link.match(/[^\[\]]+/)[0];

const getHref = (link) => link.match(/https*?:([^"')\s]+)/)[0];

const getProtocolString = (link) => link.match(/https*/)[0]

const getProtocol = (protocol) => protocol === 'https' ? https : http;

/*const arrLinks = (err, data) => {
  if(options.validate) {
    fetch(path)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log('Hubo un problema con la petición Fetch:' + error.message);
    });
  }
};
*/