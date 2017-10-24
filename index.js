// Refer to https://developer.valvesoftware.com/wiki/Steam_Web_API for more
// dtailed api documentation

const { truthy, apiRequest } = require('./helpers');
const ISteamUserStats = require('./ISteamUserStats');
const ISteamNews = require('./ISteamNews');
const IPlayerService = require('./IPlayerService');
const ISteamUser = require('./ISteamUser');

class SteamApi {
  constructor(key, steamid, appid) {
    this.globalConfig = {
      key,
      steamid,
      appid
    };
    this.userStats = new ISteamUserStats(this.globalConfig);
    this.news = new ISteamNews(this.globalConfig);
    this.user = new ISteamUser(this.globalConfig);
    this.playerService = new IPlayerService(this.globalConfig);
  }
}

module.exports = SteamApi;
