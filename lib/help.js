const http = require('http');
const https = require('https');

/*
  Functions of help for mdLinks
*/

const getKey = (options) => Object.keys(options).length > 1 ? 'both' : Object.keys(options)[0];

const getLinks = (data) => data.toString().match(/\[\w.+/g);

const getTextLink = (link) => link.match(/[^\[\]]+/)[0];

const getHref = (link) => link.match(/https*?:([^"')\s]+)/)[0];

/*
  Functions of help for options
*/

const getProtocolString = (link) => link.match(/https*/)[0]

const getProtocol = (protocol) => protocol === 'https' ? https : http;

const getObjStatus = (statusCode, elem) => {
  return {
    ...elem,
    status: statusCode,
    message: status(statusCode),
  };
};

const getStats = (arr) => (
  Object.keys(arr[0]).length > 3 ?
`Total: ${arr.length}
Unique: ${getUniqueLink(arr)}
Broken: ${getBrokenLink(arr)}` :
`Total: ${arr.length}
Unique: ${getUniqueLink(arr)}`
)

/*
  Functions helps for other functions helps
*/
const getBrokenLink = (arr) => (
  [...new Set(
    arr.filter(item => item.message !== 'ok')
  )].length 
);

const getUniqueLink = (arr) => (
  [...new Set(arr.map(item => item.href))].length
);

const status = (statusCode) => statusCode !== 200 ? 'fail' : 'ok';

module.exports = { 
  getKey,
  getLinks,
  getTextLink,
  getHref,
  getProtocolString,
  getProtocol,
  getObjStatus,
  getStats,
}