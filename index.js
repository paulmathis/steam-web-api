const axios = require('axios');

// Refer to https://developer.valvesoftware.com/wiki/Steam_Web_API for more
// dtailed api documentation

class SteamApi {
  constructor(apikey) {
    this.apikey = apikey
  }

  // Makes http request to provided url and returns a promise
  _ApiCall(httpRequestUrl, params = {}) {
    return new Promise((resolve, reject) => {
      axios
        .get(httpRequestUrl, {params})
        .then(res => {
          console.log(res)
          resolve(res.data);
        })
        .catch(err => {
          reject(err.response);
        });
    })
  }

  // Steams api uses 1 and 0 for true or false. This allows for the user to set
  // options using "true" or "false" and returns a 1 or 0 to be proccessed in the
  // get request
  truthy(boolean) {
    if (boolean) {
      return '1';
    }
    return '0';
  }

  getNewsForApp(appid, options = {}) {
    return this._ApiCall(`http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002`, {
      appid,
      count: options.count || '3',
      maxlength: options.maxlength || '300'
    })
  }

  getOwnedGames(steamid, options = {}) {
    return this._ApiCall(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001`, {
      key: this.apikey,
      steamid,
      include_appinfo: this.truthy(options.appinfo) || false,
      include_played_free_games: this.truthy(options.playedFreeGames) || false
    })
  }

}

module.exports = SteamApi;