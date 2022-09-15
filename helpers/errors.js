class ContactUserProject extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class ValidationError extends ContactUserProject {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class WrongParametersError extends ContactUserProject {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class NotAuthorizedError extends ContactUserProject {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}

module.exports = {
  ValidationError,
  WrongParametersError,
  NotAuthorizedError,
  ContactUserProject,
};
