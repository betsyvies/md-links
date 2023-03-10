const {
  isRouteValidate,
  routeAbsolute,
  isDirectory,
  validateLiks,
  getLinkAllFilesMd,
  getArrObjLinks,
} = require('./path');
const {
  isFileMd,
  isOption,
} = require('./utils');

module.exports = (path, option) => new Promise((resolve, reject) => {
  if (isRouteValidate(path)) {
    const route = routeAbsolute(path);
    let storeArrLinks = [];
    if (isDirectory(route)) {
      storeArrLinks = getLinkAllFilesMd(route);
    } else if (isFileMd(route)) {
      storeArrLinks = getArrObjLinks(route);
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
