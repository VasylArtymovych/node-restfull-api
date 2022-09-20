const jwt = require("jsonwebtoken");
const { NotAuthorizedError } = require("../helpers");

const authMiddleware = (req, res, next) => {
  const [tokenType, token] = req.headers.authorization?.split(" ");
  console.log(tokenType);

  if (!token) {
    throw new NotAuthorizedError("please, provide token");
  }
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.token = token;
    req.user = user;

    next();
  } catch (error) {
    next(new NotAuthorizedError("invalid token"));
  }
};

module.exports = {
  authMiddleware,
};
