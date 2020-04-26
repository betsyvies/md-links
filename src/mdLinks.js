const {
  isRouteValidate,
  routeAbsolute,
  isDirectory,
  readDir,
  readFileMd
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

module.exports = (path, option) => {
  return new Promise((resolve, reject) => {
    if (isRouteValidate(path)) {
      const route = routeAbsolute(path);
      let storeArrLinks = [];
      if(isDirectory(route)) {
        storeArrLinks = getLinkAllFilesMd(route, option);
      } else if(isFileMd(route)) {
        storeArrLinks = getArrObjLinks(route, option);
      } else {
        reject('No se encontro archivo .md')
      }
      if (isOption(option)) {
        storeArrLinks = Promise.all(validateLiks(storeArrLinks));
      };
      resolve(storeArrLinks);
    } else {
      reject('La ruta no es valida')
    }
  });
};

const getLinkAllFilesMd = (route) => {
  const arrLinkAllFilesMd = [];
  getFileMd(getFileMdOfDir(route)).forEach(elem => {
    getArrObjLinks(elem).forEach(obj => {
      arrLinkAllFilesMd.push(obj);
    });
  });
  return arrLinkAllFilesMd;
};

const getArrObjLinks = (route) => {
  const arrLinks = getLinks(readFileMd(route));
  return fileHasLinks(arrLinks, route);
};

const getFileMdOfDir = (route) => {
  let linksMd = ' ';
  if(isDirectory(route)) {
    const arrRoutes = getRoute(readDir(route), route);
    arrRoutes.forEach((elem) => {
      linksMd += getFileMdOfDir(elem);
    });
  } else {
    if(isFileMd(route)) {
      linksMd += route;
    }
  }
  return linksMd;
};

const fileHasLinks = (arrLinks, route) => {
  let arrInfoLinks = [];
  if (arrLinks !== null) {
    arrInfoLinks = getArrLinks(arrLinks, route);
  }
  return arrInfoLinks;
}

const getArrLinks = (arr, path) => (
  arr.map((elem) => {
    return {
      href: getHref(elem),
      text: getTextLink(elem),
      file: path,
    };
  })
);

const validateLiks = (arr) => {
  return arr.map((elem) => {
    return new Promise ((resolve) => {
      const protocol = getProtocol(getProtocolString(elem.href));
      protocol.get(elem.href, (res) => {
        const { statusCode } = res;
        resolve(getObjStatus(statusCode, elem));
      });
    });
  });
};
