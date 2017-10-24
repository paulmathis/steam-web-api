class Base {
  constructor(globalConfig) {
    this.globalConfig = globalConfig;
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
}

module.exports = Base;
