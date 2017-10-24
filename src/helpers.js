// Steams api uses 1 and 0 for true or false. This allows for the user to set
// options using "true" or "false" for readability and returns a 1 or 0 to be proccessed in the
// get request
function truthy(boolean) {
  if (boolean) {
    return '1';
  }
  return '0';
}

// Takes in a string or an array and assigns the values to an object with keys named
// name[0], name[1], etc...
function spreadNameArray(names) {
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

module.exports = {
  truthy,
  spreadNameArray
};
