// Refer to https://developer.valvesoftware.com/wiki/Steam_Web_API for more
// dtailed api documentation

const { truthy, apiRequest } = require('./helpers');

class SteamApi {
  constructor(apikey) {
    this.apikey = apikey;
  }

  getNewsForApp(appid, options = {}) {
    return apiRequest('http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002', {
      appid,
      count: options.count || '3',
      maxlength: options.maxlength || '300'
    });
  }

  getGlobalAchievementPercentagesForApp(appid) {
    return apiRequest('http://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002', {
      appid
    });
  }

  getGlobalStatsForGame(appid, names, options = {}) {
    // Takes in a string or an array and assigns the values to objects named name[0], name[1], etc...
    const namesObject = {};
    if (typeof names === 'string') {
      namesObject['name[0]'] = names;
    } else {
      names.forEach((name, i) => {
        namesObject[`name[${i}]`] = name;
      });
    }
    // Join the namesObject and the options into a single object that is passed as parameters
    return apiRequest(
      'http://api.steampowered.com/ISteamUserStats/GetGlobalStatsForGame/v0001',
      Object.assign(
        {
          appid,
          count: options.count || '1'
        },
        namesObject
      )
    );
  }

  getPlayerSummaries(steamids) {
    return apiRequest('http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v002', {
      key: this.apikey,
      steamids: `${steamids}`
    });
  }

  getFriendList(steamid, options = {}) {
    return apiRequest('http://api.steampowered.com/ISteamUser/GetFriendList/v0001', {
      key: this.apikey,
      steamid,
      relationship: options.relationship || 'friend'
    });
  }

  getPlayerAchievements(steamid, appid, options = {}) {
    return apiRequest('http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001', {
      key: this.apikey,
      steamid,
      appid
    });
  }

  getUserStatsForGame(steamid) {
    return apiRequest(' http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002', {
      key: this.apikey,
      steamid,
      appid
    });
  }

  getOwnedGames(steamid, options = {}) {
    return apiRequest('http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001', {
      key: this.apikey,
      steamid,
      include_appinfo: truthy(options.include_appinfo) || false,
      include_played_free_games: truthy(options.include_played_free_games) || false
    });
  }

  getRecentlyPlayedGames(steamid, options = {}) {
    return apiRequest('http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001', {
      key: this.apikey,
      steamid,
      count: options.count
    });
  }

  isPlayingSharedGame(steamid, appid_playing) {
    return apiRequest('http://api.steampowered.com/IPlayerService/IsPlayingSharedGame/v0001', {
      key: this.apikey,
      steamid,
      appid_playing
    });
  }

  getSchemaForGame(appid) {
    return apiRequest('http://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2', {
      key: this.apikey,
      appid
    });
  }

  getPlayerBans(steamids) {
    return apiRequest('http://api.steampowered.com/ISteamUser/GetPlayerBans/v1', {
      key: this.apikey,
      steamids: `${steamids}`
    });
  }
}

module.exports = SteamApi;
