const {
  registration,
  registrationConfirmation,
  fogotPassword,
  login,
} = require("../services");

const registrationController = async (req, res) => {
  const { password, email, subscription } = req.body;
  await registration(password, email, subscription);
  res.json({ status: "success" });
};

const registrationConfirmatiomController = async (req, res) => {
  const { code } = req.params;
  await registrationConfirmation(code);

  res.json({ status: "success" });
};

const fogotPasswordContorller = async (req, res) => {
  const { email } = req.body;

  const password = await fogotPassword(email);

  res.json({ status: "success", password });
};

const loginController = async (req, res) => {
  const { password, email } = req.body;
  const token = await login(password, email);

  res.json({ status: "success", token });
};

module.exports = {
  registrationController,
  registrationConfirmatiomController,
  fogotPasswordContorller,
  loginController,
};
