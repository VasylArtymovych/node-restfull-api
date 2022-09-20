const Joi = require("joi");
const { ValidationError } = require("../helpers/errors");

const validateAddContactFields = (req, res, next) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).json({ message: "missing required field" });
  }

  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(20).required(),
    email: Joi.string().email().required(),
    phone: Joi.string()
      .pattern(/^[0-9-]+$/)
      .min(7)
      .required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    next(new ValidationError(error.details[0].message));
  }

  next();
};

const validateUpdateContactFields = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "missing fields" });
  }

  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(20),
    email: Joi.string().email(),
    phone: Joi.string()
      .pattern(/^[0-9-]+$/)
      .min(7),
    favorite: Joi.boolean(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    next(new ValidationError(error.details[0].message));
  }

  next();
};

const validateUpdateContactStatus = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "missing fields" });
  }

  const schema = Joi.object({
    favorite: Joi.boolean().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    next(new ValidationError(error.details[0].message));
  }

  next();
};

const validateUserFields = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "missing fields" });
  }

  const schema = Joi.object({
    password: Joi.string().alphanum().min(3).max(40),
    email: Joi.string().email(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    next(new ValidationError(error.details[0].message));
  }

  next();
};

module.exports = {
  validateAddContactFields,
  validateUpdateContactFields,
  validateUpdateContactStatus,
  validateUserFields,
};
