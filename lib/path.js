const path = require('path');
const fs = require('fs');
const {
  getLinks,
  getTextLink,
  getHref,
  getRoute,
  isFileMd,
  getFileMd,
  getObjStatus,
  getProtocolString,
  getProtocol,
} = require('./utils');

const isRouteValidate = route => fs.existsSync(route);

const routeAbsolute = (route) => {
  const typeRoute = path.isAbsolute(route);
  if (!typeRoute) {
    return path.resolve(route);
  }
  return route;
};

const isDirectory = route => fs.lstatSync(route).isDirectory();

const readDir = dir => fs.readdirSync(dir, 'utf-8');

const readFileMd = file => fs.readFileSync(file, 'utf-8');

const getArrLinks = (arr, route) => (
  arr.map(elem => ({
    href: getHref(elem),
    text: getTextLink(elem),
    file: route,
  }))
);

const fileHasLinks = (arrLinks, route) => {
  let arrInfoLinks = [];
  if (arrLinks !== null) {
    arrInfoLinks = getArrLinks(arrLinks, route);
  }
  return arrInfoLinks;
};

const getFileMdOfDir = (route) => {
  let linksMd = ' ';
  if (isDirectory(route)) {
    const arrRoutes = getRoute(readDir(route), route);
    arrRoutes.forEach((elem) => {
      linksMd += getFileMdOfDir(elem);
    });
  } else if (isFileMd(route)) {
    linksMd += route;
  }
  return linksMd;
};

const getArrObjLinks = (route) => {
  const arrLinks = getLinks(readFileMd(route));
  return fileHasLinks(arrLinks, route);
};

const getLinkAllFilesMd = (route) => {
  const arrLinkAllFilesMd = [];
  getFileMd(getFileMdOfDir(route)).forEach((elem) => {
    arrLinkAllFilesMd.push(...getArrObjLinks(elem))
  });
  return arrLinkAllFilesMd;
};

const validateLiks = arr => arr.map(elem => new Promise((resolve) => {
  const protocol = getProtocol(getProtocolString(elem.href));
  protocol.get(elem.href, (res) => {
    const { statusCode } = res;
    resolve(getObjStatus(statusCode, elem));
  });
}));

module.exports = {
  validateLiks,
  getLinkAllFilesMd,
  isRouteValidate,
  getArrObjLinks,
  routeAbsolute,
  isDirectory,
};
