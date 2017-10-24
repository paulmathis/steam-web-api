const Base = require('./Base');

class ISteamUser extends Base {
  getPlayerSummaries(config = {}) {
    config.steamids = `${config.steamids || this.globalConfig.steamid}`; // Stringify inputed array or insert global steamid
    return apiRequest('http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v002', this._mergeConfigs(config));
  }

  getFriendList(config) {
    const defaults = {
      relationship: 'friend'
    };
    return apiRequest(
      'http://api.steampowered.com/ISteamUser/GetFriendList/v0001',
      this._mergeConfigs(config, defaults)
    );
  }
  getSchemaForGame(config) {
    return apiRequest('http://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2', this._mergeConfigs(config));
  }

  getPlayerBans(config = {}) {
    config.steamids = `${config.steamids || this.globalConfig.steamid}`; // Stringify inputed array or insert global steamid
    return apiRequest('http://api.steampowered.com/ISteamUser/GetPlayerBans/v1', this._mergeConfigs(config));
  }
}

module.exports = ISteamUser;
