const axios = require('axios');

// Base class holds shared helper methods
class Base {
  constructor(globalConfig) {
    this.globalConfig = globalConfig;
  }

  // Makes http request to url with params and returns a promise
  _apiRequest(httpRequestUrl, params = {}) {
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

  // Merge global configs from the constructor with any defaults and
  // then overwrite any parameter inputs from the method call
  _mergeConfigs(config, defaults = {}) {
    const params = {};
    Object.assign(params, this.globalConfig, defaults, config);
    return params;
  }
}

module.exports = Base;
