// Refer to https://developer.valvesoftware.com/wiki/Steam_Web_API for more
// dtailed api documentation

const { truthy, apiRequest } = require('./helpers');

class SteamApi {
  constructor(key, steamid, appid) {
    this.globalConfig = {
      key,
      steamid,
      appid
    };
  }

  // Merge global configs from the constructor with any defaults and
  // then overwrite any parameter inputs from the method call
  _mergeConfigs(config, defaults = {}) {
    const params = {};
    Object.assign(params, this.globalConfig, defaults, config);
    return params;
  }

  _spreadNameArray(names) {
    // Takes in a string or an array and assigns the values to an object with keys named
    // name[0], name[1], etc...
    const namesObject = {};
    if (typeof names === 'string') {
      namesObject['name[0]'] = names;
    } else {
      names.forEach((name, i) => {
        namesObject[`name[${i}]`] = name;
      });
    }
    return namesObject;
  }

  getNewsForApp(config) {
    const defaults = {
      count: '3',
      maxlength: '300'
    };
    return apiRequest(
      'http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002',
      this._mergeConfigs(config, defaults)
    );
  }

  getGlobalAchievementPercentagesForApp(config) {
    return apiRequest(
      `http://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002`,
      this._mergeConfigs(config)
    );
  }

  getGlobalStatsForGame(config = {}) {
    const defaults = {
      count: '1'
    };
    // Turns array of achievement names into an object that can be passed into the get params
    const namesObject = this._spreadNameArray(config.names);
    delete config.names; // Remove the array to prevent conflicts
    Object.assign(config, namesObject); // Merge names object back into users config

    return apiRequest(
      'http://api.steampowered.com/ISteamUserStats/GetGlobalStatsForGame/v0001',
      this._mergeConfigs(config, defaults)
    );
  }

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

  getPlayerAchievements(config) {
    return apiRequest(
      'http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001',
      this._mergeConfigs(config)
    );
  }

  getUserStatsForGame(config) {
    return apiRequest(
      ' http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002',
      this._mergeConfigs(config)
    );
  }

  getOwnedGames(config = {}) {
    config.include_appinfo = truthy(config.include_appinfo);
    config.include_played_free_games = truthy(config.include_played_free_games);

    const defaults = {
      include_appinfo: false,
      include_played_free_games: false
    };

    return apiRequest(
      'http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001',
      this._mergeConfigs(config, defaults)
    );
  }

  getRecentlyPlayedGames(config) {
    return apiRequest(
      'http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001',
      this._mergeConfigs(config)
    );
  }

  isPlayingSharedGame(config = {}) {
    config.appid_playing = config.appid_playing || this.globalConfig.appid;

    return apiRequest(
      'http://api.steampowered.com/IPlayerService/IsPlayingSharedGame/v0001',
      this._mergeConfigs(config)
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

module.exports = SteamApi;
