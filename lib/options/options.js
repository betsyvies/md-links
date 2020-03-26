const validate = (protocol) => {
  return new Promise ((resolve, reject) => {
      https.get('https://github.com/betsyvies/insta-collage', (res) => {
        const { statusCode } = res;
        console.log(statusCode);
  
        let error;
        if (statusCode !== 200) {
          resolve({
            status: statusCode,
            fail: 'fail'
          });
          error = new Error('Request Failed.\n' +
          `Status Code: ${statusCode}`);
        } else {
          resolve({
            status: statusCode,
            ok: 'ok'
          });
        }

        if (error) {
          reject(error.message);
        }
      })
    }
  );
};

const stast = () => {

};