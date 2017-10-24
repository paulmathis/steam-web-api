*NOTE: This is a work in progress. Not all API calls are functional*

# steam-web-api

A promise based API wrapper for the [Steam Web API](https://developer.valvesoftware.com/wiki/Steam_Web_API)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

```
Node
NPM or Yarn
Steam Web API Key
```

### Installing

Clone the repository
```
git clone https://github.com/paulmathis/steam-web-api.git
```
Install dependicies
```
npm install
or
yarn install
```

### Example

Create a new .js file
```javascript
const SteamApi = require('./index.js');

const steam = new SteamApi('your-steam-api-key');

steam.playerService.getOwnedGames({
    steamid: 'xxxxxxxxxxxxxx',
    appinfo: 'true',
    playedFreeGames: false
  })
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  })
```

### API

#### Constructor
To start you call the SteamApi constructor .
```javascript
const steam = new SteamApi(key, steamid, appid) 
```
key: Your Steam Dev API Key

steamid: (Optional)

appid: (Optional)
#### Methods

Method names match the [official steam documentation](https://developer.valvesoftware.com/wiki/Steam_Web_API).
The first letter is lowercase to match traditional javascript functions.

Methods are placed into sub-classes based on which Steam API Interfaces are being used. This currently includes

``` javascript
user // ISteamUser
userStats //ISteamUserStats
news //ISteamNews
playerService //ISteamPlayerService
```
Each method accepts a config object that coorilate to the http request arguments

##### steam.interface.method({config})

For Eaxample: http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=440&count=3&maxlength=300&format=json can be broken down like this.

``` javascript
steam.news.getNewsForApp({
  appid: '440',
  count: '3',
  maxlength: '300',
  format: 'json'
})
```
