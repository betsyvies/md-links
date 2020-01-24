// const fs = require('fs');
const path = require('path');

module.exports = (path, options) => {
  fs.readFile(path, 'utf-8', arrLinks);
};
//  fs.readFile(path, 'utf-8', arrLinks);

const arrLinks = (err, data) => {
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

const getTextURL = (href) => href.replace(/(["'/\-:.#$&_0-9]+)/g, ' ');