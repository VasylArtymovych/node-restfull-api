const { ValidationError } = require("../helpers/errors");

const validateMiddleware = (schema) => {
  return (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "missing fields" });
    }

    const { error } = schema.validate(req.body);
    if (error) {
      next(new ValidationError(error.details[0].message));
    }

    next();
  };
};

module.exports = {
  validateMiddleware,
};
