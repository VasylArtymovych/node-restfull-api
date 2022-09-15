module.exports = ["./apiHelpers.js", "./errors.js"].reduce((obj, file) => {
  const imp = require(file);
  Object.assign(obj, imp);
  return obj;
}, {});
