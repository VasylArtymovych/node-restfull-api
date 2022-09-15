const express = require("express");
const {
  getContactsController,
  getByIdController,
  addContactController,
  deleteContactController,
  updateContactController,
  updateContactStatusController,
} = require("../../controllers");
const {
  validateAddContactFields,
  validateUpdateContactFields,
  validateUpdateContactStatus,
  authMiddleware,
} = require("../../middlewares");

const { controllerWraper } = require("../../helpers");

const router = express.Router();

router.use(authMiddleware);

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
  "/:contactId/favorite",
  validateUpdateContactStatus,
  controllerWraper(updateContactStatusController)
);

module.exports = { contactsRouter: router };
