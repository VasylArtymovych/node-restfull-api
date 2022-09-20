module.exports = [
  "./connection.js",
  "./contactModel.js",
  "./userModel.js",
].reduce((obj, file) => {
  const imp = require(file);
  Object.assign(obj, imp);
  return obj;
}, {});
