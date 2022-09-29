const express = require("express");
const {
  getContactsController,
  getByIdController,
  addContactController,
  deleteContactController,
  updateContactController,
  updateContactStatusController,
} = require("../../controllers");
const { authMiddleware, validateMiddleware } = require("../../middlewares");
const { contactSchema, statusSchema } = require("../../schemas");

const { controllerWraper } = require("../../helpers");

const router = express.Router();

router.use(authMiddleware);

router.get("/", controllerWraper(getContactsController));

router.get("/:contactId", controllerWraper(getByIdController));

router.post(
  "/",
  validateMiddleware(contactSchema),
  controllerWraper(addContactController)
);

router.delete("/:contactId", controllerWraper(deleteContactController));

router.put(
  "/:contactId",
  validateMiddleware(contactSchema),
  controllerWraper(updateContactController)
);

router.patch(
  "/:contactId/favorite",
  validateMiddleware(statusSchema),
  controllerWraper(updateContactStatusController)
);

module.exports = { contactsRouter: router };
