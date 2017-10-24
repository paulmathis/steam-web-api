const Base = require('./Base');

class IPlayerService extends Base {
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
}

module.exports = IPlayerService;
