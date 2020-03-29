const validate = (protocol, elem) => {
  return new Promise ((resolve, reject) => {
      protocol.get(elem.href, (res) => {
        const { statusCode } = res;
        //console.log(statusCode);
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

const stast = () => {

};


const getObjStatus = (statusCode, elem) => {
  return {
    ...elem,
    status: statusCode,
    message: status(statusCode),
  };
};

const status = (statusCode) => statusCode !== 200 ? 'fail' : 'ok';


module.exports = { validate }