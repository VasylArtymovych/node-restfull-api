const Joi = require("joi");

const userSchema = Joi.object({
  password: Joi.string().alphanum().min(5),
  email: Joi.string().email(),
});

module.exports = {
  userSchema,
};
