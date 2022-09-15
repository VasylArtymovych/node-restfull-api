const express = require("express");
const {
  registrationController,
  loginController,
} = require("../../controllers");
const { validateUserFields } = require("../../middlewares");

const { controllerWraper } = require("../../helpers/apiHelpers");

const router = express.Router();

router.post(
  "/registration",
  validateUserFields,
  controllerWraper(registrationController)
);

router.post("/login", validateUserFields, controllerWraper(loginController));

module.exports = { usersRouter: router };
