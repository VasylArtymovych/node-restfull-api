module.exports = [
  "./contactsController.js",
  "./usersControllers.js",
  "./filesController.js",
].reduce((obj, file) => {
  const imp = require(file);
  Object.assign(obj, imp);
  return obj;
}, {});
