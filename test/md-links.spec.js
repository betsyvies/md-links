const mdLinks = require('../lib/index');
const {
  arrLinksDir,
  arrLinksFile,
  arrLinksDirOptVal,
  arrLinksFileOptVal,
} = require('./data/data');

describe('mdLinks', () => {
  test('the path is not validate', () => {
    mdLinks('./readme')
      .catch(e => expect(e).toMatch('La ruta no es valida'));
  });

  test('the path is not file .md', () => {
    mdLinks('./readmes/otherFiles.txt')
      .catch(e => expect(e).toMatch('No se encontro archivo .md'));
  });

  test('should return a set of objects of file', () => {
    mdLinks('./readmes/example.md')
      .then((links) => {
        expect(links).toEqual(arrLinksFile);
      });
  });

  test('should return a set of obj of dir', () => {
    mdLinks('./readmes')
      .then((links) => {
        expect(links).toEqual(arrLinksDir);
      });
  });

  test('should return a set empty', () => {
    mdLinks('./readmes/example1.md')
      .then((links) => {
        expect(links).toEqual([]);
      });
  });

  test('should return a set of objects of file and opt-val', () => {
    mdLinks('./readmes/example.md')
      .then((links) => {
        expect(links).toEqual(arrLinksFileOptVal);
      });
  });

  test('should return a set of obj of dir and opt-val', () => {
    mdLinks('./readmes')
      .then((links) => {
        expect(links).toEqual(arrLinksDirOptVal);
      });
  });
});
