const { validate, stats } = require('../options');

describe('Options for md-links', () => {
  test('Option validate', (done) => {
    validate().then((arr) => {
      expect(datos).toEqual(data);
      done();
    });
  });
  /*test('Promise - Promise(resolve, reject)', done => {
    let url = "http://localhost:3000/posts";
    ajaxGet(url).then(datos => {
        const data = [{ "id": 1, "title": "json-server", "author": "typicode" }];
        expect(datos.length).toBeGreaterThanOrEqual(1);
        expect(datos[0].id).toBeGreaterThanOrEqual(1);
        expect(datos).toEqual(data);
        done();
    });
  });
  test('Promise - .resolves', () => {
      let url = "http://localhost:3000/profile";
      return expect(ajaxGet(url)).resolves.toEqual({"name": "typicode"});
  });
  test('Promise - .rejects', () => {
      let url = "http://localhost:3000/fail";
      return expect(ajaxGet(url)).rejects.toEqual('Not Found');
  });
  test('Promise - Promise.resolve', () => {
      let data = { nombre: 'Test', estado: true };
      return expect(Promise.resolve(data)).resolves.toEqual(data);
  });
  test('Promise - Promise.reject', () => {
      let data = { error: 'Error', code: 200 };
      return expect(Promise.reject(data)).rejects.toEqual(data);
  });*/
});