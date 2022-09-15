const { registration, login } = require("../services");

const registrationController = async (req, res) => {
  const { password, email, subscription } = req.body;
  await registration(password, email, subscription);

  res.json({ status: "success" });
};

const loginController = async (req, res) => {
  const { password, email } = req.body;
  const token = await login(password, email);

  res.json({ status: "success", token });
};

module.exports = { registrationController, loginController };
