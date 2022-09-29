const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(20),
  email: Joi.string().email(),
  phone: Joi.string()
    .pattern(/^[0-9-]+$/)
    .min(7)
    .required(),
  favorite: Joi.boolean(),
});

const statusSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  contactSchema,
  statusSchema,
};
