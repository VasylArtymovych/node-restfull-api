const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sha256 = require("sha256");
const { User, Verification } = require("../db");
const { NotAuthorizedError, sendMail } = require("../helpers");

const SECRET = process.env.JWT_SECRET;
// registration
const registration = async (password, email, subscription) => {
  const newUser = new User({ password, email, subscription });
  await newUser.save();

  const code = sha256(email + SECRET);
  const verification = new Verification({
    code,
    userId: newUser._id,
  });
  await verification.save();

  await sendMail({
    to: email,
    subject: "Confirm registration!",
    text: `Please confirm your email adress POST http://localhost:8083/api/users/register_confirmation/${code}`,
    html: `<strong>Please confirm your email adress POST http://localhost:3030/api/users/register_confirmation/${code}</strong>`,
    // html: `Please<a href="http://localhost:3030/api/users/register_confirmation/${code}">confirm</a> your email`,
  });
};

// confirmation of registration
const registrationConfirmation = async (code) => {
  const verification = await Verification.findOne({ code, active: true });
console.log(verification.userId);
  if (!verification) {
    throw new NotAuthorizedError("Invalid or expired confirmation code");
  }

  const user = await User.findOneAndUpdate(
    { _id: verification.userId },
    { $set: { confirmed: true } }
  );
  
  if (!user) {
    throw new NotAuthorizedError("No user found");
  }

  verification.active = false;
  await verification.save();

  await sendMail({
    to: user.email,
    subject: "Thanks for registration!",
    text: "You are successfully registred",
    html: "<strong>You are successfully registred</strong>",
  });
};

// fogot_password
const fogotPassword = async (email) => {
  const user = await User.findOne({ email, confirmed: true });
  if (!user) {
    throw new NotAuthorizedError(`No user with email ${email} found`);
  }

  const password = sha256(Date.now() + SECRET);

  user.password = password;
  user.save();

  await sendMail({
    to: user.email,
    subject: "Fogot password!",
    text: `Here is your temporary password is ${password}`,
    html: `<strong>Here is your temporary password is ${password}</strong>`,
  });

  return password;
};

// login
const login = async (password, email) => {
  const user = await User.findOne({ email, confirmed: true });
  if (!user) {
    throw new NotAuthorizedError(`No user with email ${email} found`);
  }

  const result = await bcrypt.compare(password, user.password);
  const res = await bcrypt.compare(
    password,
    "$2b$10$BPQ2H.Qwb57mHMbeUtD6WelLM6xQJ/moMzUwcp0CW7Ws1iwyZhxhW"
  );
  console.log(res, password);
  if (!result) {
    throw new NotAuthorizedError("wrong password");
  }

  const token = jwt.sign({ id: user._id, email }, SECRET);
  return token;
};

module.exports = {
  registration,
  registrationConfirmation,
  fogotPassword,
  login,
};
