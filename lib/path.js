const path = require('path');
const fs = require('fs');

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

module.exports = {
  isRouteValidate,
  routeAbsolute,
  isDirectory,
  readDir,
  readFileMd,
};
