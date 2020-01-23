const fs = require('fs');
const path = require('path');

module.exports = (path, options) => {
  fs.readFile(path, 'utf-8', (err, data) => {
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
      console.log(newArray);
    }
  });
};

const getTextURL = (href) => href.replace(/(["'/\-:.#$&_0-9]+)/g, ' ');