module.exports = ["./contactService.js", "./userServices.js"].reduce(
  (obj, file) => {
    const imp = require(file);
    Object.assign(obj, imp);
    return obj;
  },
  {}
);
