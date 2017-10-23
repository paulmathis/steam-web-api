const axios = require('axios');

// Steams api uses 1 and 0 for true or false. This allows for the user to set
// options using "true" or "false" for readability and returns a 1 or 0 to be proccessed in the
// get request
function truthy(boolean) {
  if (boolean) {
    return '1';
  }
  return '0';
}

// Makes http request to url with params and returns a promise
function apiRequest(httpRequestUrl, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(httpRequestUrl, { params })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.response);
      });
  });
}

exports.truthy = truthy;
exports.apiRequest = apiRequest;
