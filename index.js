// Refer to https://developer.valvesoftware.com/wiki/Steam_Web_API for more
// dtailed api documentation

const ISteamUserStats = require('./src/ISteamUserStats');
const ISteamNews = require('./src/ISteamNews');
const IPlayerService = require('./src/IPlayerService');
const ISteamUser = require('./src/ISteamUser');

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
