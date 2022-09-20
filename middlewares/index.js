module.exports = ["./validationMiddleware.js", "./authMiddleware.js"].reduce(
  (obj, file) => {
    const imp = require(file);
    Object.assign(obj, imp);
    return obj;
  },
  {}
);
