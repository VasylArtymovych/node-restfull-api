module.exports = ["./contactShemas.js", "./userShema.js"].reduce(
  (obj, file) => {
    const imp = require(file);
    Object.assign(obj, imp);
    return obj;
  },
  {}
);
