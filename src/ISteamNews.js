const Base = require('./Base');

const { truthy } = require('./helpers');

class ISteamNews extends Base {
  getNewsForApp(config) {
    const defaults = {
      count: '3',
      maxlength: '300'
    };
    return this._apiRequest(
      'http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002',
      this._mergeConfigs(config, defaults)
    );
  }
}

module.exports = ISteamNews;
