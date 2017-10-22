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
SteamApi = require('./index.js');

steam = new SteamApi('your-steam-api-key');

steam
  .getOwnedGames('your-steam-id', {
  appinfo: false,
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
Method names match the [official steam documentation](https://developer.valvesoftware.com/wiki/Steam_Web_API).

The first letter is lowercase to match traditional javascript functions.

##### functionName((steamid||appid)[,params])
```javascript
// Get News for App
steam.getNewsForApp('440', {
  count: '3'
  maxlength: 300,
})
  .then(res => {
  console.log(res);
  })
```