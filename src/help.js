const http = require('http');
const https = require('https');

/*
  Functions of help for mdLinks
*/

const isOption = (option) => option !== undefined && option.validate 

const getLinks = (data) => data.toString().match(/\[\w.+/g);

const isFileMd = (route) => /\.md/.test(route);

const getTextLink = (link) => link.match(/[^\[\]]+/)[0];

const getHref = (link) => link.match(/https*?:([^"')\s]+)/)[0];

const getRoute = (arrRoute, route) => arrRoute.map((elem) => `${route}/${elem}`)

const getFileMd = (str) => str.replace(/^\s+|\s+$|\s+(?=\s)/g, "").split(' ');

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

/*
  Functions helps for other functions helps
*/

const status = (statusCode) => statusCode !== 200 ? 'fail' : 'ok';

module.exports = { 
  //getKey,
  getLinks,
  getTextLink,
  getHref,
  getProtocolString,
  getProtocol,
  getObjStatus,
  getRoute,
  getFileMd,
  isFileMd,
  isOption,
}