const express = require("express");
const {
  getContactsController,
  getByIdController,
  addContactController,
  deleteContactController,
  updateContactController,
  updateContactStatusController,
} = require("../controllers/contactsController");
const {
  validateAddContactFields,
  validateUpdateContactFields,
  validateUpdateContactStatus,
} = require("../../middlewares/validationMiddleware");

const { controllerWraper } = require("../../helpers/apiHelpers");

const router = express.Router();

router.get("/", controllerWraper(getContactsController));

router.get("/:contactId", controllerWraper(getByIdController));

router.post(
  "/",
  validateAddContactFields,
  controllerWraper(addContactController)
);

router.delete("/:contactId", controllerWraper(deleteContactController));

router.put(
  "/:contactId",
  validateUpdateContactFields,
  controllerWraper(updateContactController)
);

router.patch(
  "/:contactId",
  validateUpdateContactStatus,
  controllerWraper(updateContactStatusController)
);

module.exports = router;
