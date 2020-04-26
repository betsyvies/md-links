
const validate = (arr) => {
  let links = '';
  arr.forEach((obj) =>{
    links += `${obj.file} ${obj.href} ${obj.message} ${obj.status} ${obj.text}\n`;
  });
  return links.trim();
}

const noOptions = (arr) => {
  let links = '';
  arr.forEach((obj) =>{
    links += `${obj.file} ${obj.href} ${obj.text}\n`;
  });
  return links.trim();
}
const stats = (arr) => (
`Total: ${arr.length}
Unique: ${getUniqueLink(arr)}`
);

const validateAndStats = (arr) => (
`Total: ${arr.length}
Unique: ${getUniqueLink(arr)}
Broken: ${getBrokenLink(arr)}`
);

const getBrokenLink = (arr) => (
  [...new Set(
    arr.filter(item => item.message !== 'ok')
  )].length 
);

const getUniqueLink = (arr) => (
  [...new Set(arr.map(item => item.href))].length
);

module.exports = { 
  validate, 
  stats, 
  noOptions, 
  validateAndStats 
}
