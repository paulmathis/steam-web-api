const Base = require('./Base');

const { spreadNameArray } = require('./helpers');

class ISteamUserStats extends Base {
  getGlobalAchievementPercentagesForApp(config) {
    return this._apiRequest(
      `http://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002`,
      this._mergeConfigs(config)
    );
  }

  getGlobalStatsForGame(config = {}) {
    const defaults = {
      count: '1'
    };
    // Turns array of achievement names into an object that can be passed into the get params
    const namesObject = spreadNameArray(config.names);
    delete config.names; // Remove the array to prevent conflicts
    Object.assign(config, namesObject); // Merge names object back into users config

    return this._apiRequest(
      'http://api.steampowered.com/ISteamUserStats/GetGlobalStatsForGame/v0001',
      this._mergeConfigs(config, defaults)
    );
  }

  getPlayerAchievements(config) {
    return this._apiRequest(
      'http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001',
      this._mergeConfigs(config)
    );
  }

  getUserStatsForGame(config) {
    return this._apiRequest(
      ' http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002',
      this._mergeConfigs(config)
    );
  }
}

module.exports = ISteamUserStats;
