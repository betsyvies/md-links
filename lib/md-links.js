const {
  isRouteValidate,
  routeAbsolute,
  isDirectory,
  readDir,
  readFileMd,
} = require('./path');
const {
  getLinks,
  getTextLink,
  getHref,
  getRoute,
  isFileMd,
  getFileMd,
  isOption,
  getObjStatus,
  getProtocolString,
  getProtocol,
} = require('./help');

const getArrLinks = (arr, path) => (
  arr.map(elem => ({
    href: getHref(elem),
    text: getTextLink(elem),
    file: path,
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
    getArrObjLinks(elem).forEach((obj) => {
      arrLinkAllFilesMd.push(obj);
    });
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

module.exports = (path, option) => new Promise((resolve, reject) => {
  if (isRouteValidate(path)) {
    const route = routeAbsolute(path);
    let storeArrLinks = [];
    if (isDirectory(route)) {
      storeArrLinks = getLinkAllFilesMd(route, option);
    } else if (isFileMd(route)) {
      storeArrLinks = getArrObjLinks(route, option);
    } else {
      reject(new Error('No se encontro archivo .md'));
    }
    if (isOption(option)) {
      storeArrLinks = Promise.all(validateLiks(storeArrLinks));
    }
    resolve(storeArrLinks);
  } else {
    reject(new Error('La ruta no es valida'));
  }
});
