// Refer to https://developer.valvesoftware.com/wiki/Steam_Web_API for more
// dtailed api documentation

const { truthy, apiRequest } = require('./helpers');

class SteamApi {
  constructor(apikey, steamid, appid) {
    this.apikey = apikey;
    this.steamid = steamid;
    this.appid = appid;
  }

  getNewsForApp(appid, config = {}) {
    const params = {
      appid: config.appid || this.appid,
      count: config.count || '3',
      maxlength: config.maxlength || '300'
    };
    return apiRequest('http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002', params);
  }

  getGlobalAchievementPercentagesForApp(appid) {
    return apiRequest('http://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002', {
      appid
    });
  }

  getGlobalStatsForGame(appid, names, config = {}) {
    // Takes in a string or an array and assigns the values to objects named name[0], name[1], etc...
    const namesObject = {};
    if (typeof names === 'string') {
      namesObject['name[0]'] = names;
    } else {
      names.forEach((name, i) => {
        namesObject[`name[${i}]`] = name;
      });
    }
    // Join the namesObject and the config into a single object that is passed as parameters
    return apiRequest(
      'http://api.steampowered.com/ISteamUserStats/GetGlobalStatsForGame/v0001',
      Object.assign(
        {
          appid,
          count: config.count || '1'
        },
        namesObject
      )
    );
  }

  getPlayerSummaries(steamids = this.steamid) {
    return apiRequest('http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v002', {
      key: this.apikey,
      steamids: `${steamids}`
    });
  }

  getFriendList(steamid = this.steamid, config = {}) {
    return apiRequest('http://api.steampowered.com/ISteamUser/GetFriendList/v0001', {
      key: this.apikey,
      steamid,
      relationship: config.relationship || 'friend'
    });
  }

  getPlayerAchievements(steamid = this.steamid, appid, config = {}) {
    return apiRequest('http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001', {
      key: this.apikey,
      steamid,
      appid
    });
  }

  getUserStatsForGame(steamid = this.steamid) {
    return apiRequest(' http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002', {
      key: this.apikey,
      steamid,
      appid
    });
  }

  getOwnedGames(config = {}) {
    const params = {
      key: this.apikey,
      steamid: config.steamid || this.steamid,
      include_appinfo: truthy(config.include_appinfo) || false,
      include_played_free_games: truthy(config.include_played_free_games) || false
    };

    return apiRequest('http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001', params);
  }

  getRecentlyPlayedGames(steamid = this.steamid, config = {}) {
    return apiRequest('http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001', {
      key: this.apikey,
      steamid,
      count: config.count
    });
  }

  isPlayingSharedGame(config = {}) {
    const params = {
      key: this.apikey,
      steamid: config.steamid || this.steamid,
      appid_playing: config.appid_playing
    };

    return apiRequest('http://api.steampowered.com/IPlayerService/IsPlayingSharedGame/v0001', params);
  }

  getSchemaForGame(appid) {
    return apiRequest('http://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2', {
      key: this.apikey,
      appid
    });
  }

  getPlayerBans(steamids = this.steamid) {
    return apiRequest('http://api.steampowered.com/ISteamUser/GetPlayerBans/v1', {
      key: this.apikey,
      steamids: `${steamids}`
    });
  }
}

module.exports = SteamApi;
