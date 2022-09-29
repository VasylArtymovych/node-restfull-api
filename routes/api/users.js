const express = require("express");
const {
  registrationController,
  registrationConfirmatiomController,
  fogotPasswordContorller,
  loginController,
} = require("../../controllers");
const { validateMiddleware } = require("../../middlewares");
const { userSchema } = require("../../schemas");

const { controllerWraper } = require("../../helpers/apiHelpers");

const router = express.Router();

router.post(
  "/register",
  validateMiddleware(userSchema),
  controllerWraper(registrationController)
);

router.post(
  "/register_confirmation/:code",
  controllerWraper(registrationConfirmatiomController)
);
// === other option: ===
// router.get(
//   "/register_confirmation/:code",
//   controllerWraper(registrationConfirmatiomController)
// );

router.post("/fogot_password", controllerWraper(fogotPasswordContorller));

router.post(
  "/login",
  validateMiddleware(userSchema),
  controllerWraper(loginController)
);

module.exports = { usersRouter: router };
