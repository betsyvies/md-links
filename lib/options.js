const {
  getObjStatus,
  getProtocolString,
  getProtocol,
  getStats,
} = require('./help')

const validate = (elem) => {
  const protocol = getProtocol(getProtocolString(elem.href));
  return new Promise ((resolve, reject) => {
      protocol.get(elem.href, (res) => {
        const { statusCode } = res;
        let error;
        if (statusCode !== 200) {
          error = new Error('Request Failed.\n' +
          `Status Code: ${statusCode}`);
        }
        resolve(getObjStatus(statusCode, elem));
        if (error) {
          reject(error.message);
        }
      })
    }
  );
};

const stats = (arr) => {
  return Promise.all(arr).then(getStats);
};

module.exports = { validate, stats }
