const fs = require('fs');
const path = require('path');

module.exports = (path, options) => {
  fs.readFile(path, 'utf-8', (err, data) => {
    if(err) {
      console.log('error: ', err);
    } else {
      console.log(data.toString());
    }
  });
};