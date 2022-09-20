const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../db");
const { NotAuthorizedError } = require("../helpers");

const SECRET = process.env.JWT_SECRET;

const registration = async (password, email, subscription) => {
  const newUser = new User({ password, email, subscription });
  await newUser.save();
};

const login = async (password, email) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new NotAuthorizedError(`No user with email ${email} found`);
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw new NotAuthorizedError("wrong password");
  }

  const token = jwt.sign({ id: user._id, email }, SECRET);
  return token;
};

module.exports = { registration, login };
