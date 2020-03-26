const mdLinks = require('./mdLinks');
const http = require('http');
const https = require('https');
const argv = require('./yargs').argv;

const path = argv._[0];
console.log(argv.validate);

if (argv.validate) {
  
}

//console.log(mdLinks(path, {validate: true}))
/*mdLinks(path, {validate: true}).then(links => {
  links.forEach(obj => console.log(`${obj.file} ${obj.href} ${obj.text}`));
});*/
/*if (argv.validate) {
  mdLinks(path, {validate: true})
} else {
  mdLinks(path, {})
};*/

/*https.get('https://github.com/betsyvies/insta-collage', (res) => {
  const { statusCode } = res;
  console.log(statusCode);

  let obj;
  if (statusCode !== 200) {
    obj = {
      status: statusCode,
      fail: 'fail'
    };
  } else {
    obj = {
      status: statusCode,
      ok: 'fail'
    };
  }
  console.log(obj)
});*/
