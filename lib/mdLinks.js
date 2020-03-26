const fs = require('fs');

module.exports = (path, options) => {
  return new Promise((resolve, reject) => {
    // Llamamos a resolve(...) cuando lo que estabamos haciendo finaliza con éxito, y reject(...) cuando falla.
    fs.readFile(path, 'utf-8', (err, data) => {
      if(err) {
        reject(err);
      } else {
        const expreRegular = /\[\w.+/g;
        const arrURL = data.toString().match(expreRegular);
        const newArray = [];
        arrURL.forEach((elem) => {
          newArray.push({
            href: getHref(elem),
            text: getTextLink(elem),
            file: path,
          });
        });
        resolve(newArray);
      }
    });
  })
};

const getTextLink = (link) => link.match(/[^\[\]]+/)[0];

const getHref = (link) => link.match(/https?:([^"')\s]+)/)[0]

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
  if(err) {
    console.log('error: ', err);
  } else {
    const expreRegular = /https?:([^"')\s]+)/g;
    const arrURL = data.toString().match(expreRegular);
    const newArray = [];
    arrURL.forEach((elem) => {
      newArray.push({
        href: elem,
        text: getTextURL(elem),
        file: path,
      });
    });
    return newArray;
  };
};
const getTextLink = (link) => href.replace(/(["'/\-:.#$&_0-9]+)/g, ' ')
*/