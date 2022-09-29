const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
const sha256 = require("sha256");
const { User, Verification } = require("../db");
const { NotAuthorizedError } = require("../helpers");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const SECRET = process.env.JWT_SECRET;
// registration
const registration = async (password, email, subscription) => {
  // const hashPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ password, email, subscription });
  await newUser.save();

  const code = sha256(email + SECRET);
  const verification = new Verification({
    code,
    userId: newUser._id,
  });
  await verification.save();

  const msg = {
    to: email,
    from: "yerimjunior@meta.ua",
    subject: "Thanks for registration!",
    text: `Please confirm your email adress POST http://localhost:8083/api/users/register_confirmation/${code}`,
    html: `<strong>Please confirm your email adress POST http://localhost:3030/api/users/register_confirmation/${code}</strong>`,
    // html: `Please<a href="http://localhost:3030/api/users/register_confirmation/${code}">confirm</a> your email`,
  };
  await sgMail.send(msg);
  console.log("email sent");
};

// confirmation of registration
const registrationConfirmation = async (code) => {
  const verification = await Verification.findOne({ code, active: true });

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

  const msg = {
    to: user.email,
    from: "yerimjunior@meta.ua",
    subject: "Thanks for registration!",
    text: "You are successfully registred",
    html: "<strong>You are successfully registred</strong>",
  };
  await sgMail.send(msg);
  console.log("email sent");
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

  const msg = {
    to: user.email,
    from: "yerimjunior@meta.ua",
    subject: "Fogot password!",
    text: `Here is your temporary password is ${password}`,
    html: `<strong>Here is your temporary password is ${password}</strong>`,
  };
  await sgMail.send(msg);

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
