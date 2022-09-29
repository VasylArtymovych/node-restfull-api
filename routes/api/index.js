module.exports = [
  "./contacts.js",
  "./users.js",
  "./uploadFiles.js",
  "./nodemailer.js",
].reduce((obj, file) => {
  const imp = require(file);
  Object.assign(obj, imp);
  return obj;
}, {});
