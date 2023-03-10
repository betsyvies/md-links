#!/usr/bin/env node
const mdLinks = require('.');
const {
  noOptions, validate, stats, validateAndStats,
} = require('./options');

const args = process.argv.slice(2);

const cli = (path, opt1, opt2) => mdLinks(path, { validate: true })
  .then((arrLinks) => {
    if (opt1 === '--validate' && opt2 === '--stats') {
      return validateAndStats(arrLinks);
    }
    if (opt1 === '--stats' || opt2 === '--s' || opt2 === 's') {
      return stats(arrLinks);
    } 
    if (opt1 === '--validate' || opt1 === '--v' || opt1 === 'v') {
      return validate(arrLinks);
    }
    return noOptions(arrLinks);
  })

cli(args[0], args[1], args[2])
  .then(res => console.log(res))
  .catch(error => console.log(error.message));
