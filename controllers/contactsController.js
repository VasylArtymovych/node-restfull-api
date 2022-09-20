const {
  getContacts,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
  updateStatus,
} = require("../services");

const getContactsController = async (req, res) => {
  const { id: owner } = req.user;
  const contacts = await getContacts(owner);

  res.status(200).json(contacts);
};

const getByIdController = async (req, res) => {
  const contactId = req.params.contactId;
  const { id: owner } = req.user;
  const contact = await getContactById(contactId, owner);

  res.status(200).json({ status: "success", contact });
};

const addContactController = async (req, res) => {
  const { id: owner } = req.user;
  await addContact(req.body, owner);

  res.status(200).json({ status: "success" });
};

const deleteContactController = async (req, res) => {
  const contactId = req.params.contactId;
  const { id: owner } = req.user;
  const contact = await deleteContact(contactId, owner);

  res.status(200).json({ status: "deleted", contact });
};

const updateContactController = async (req, res) => {
  const contactId = req.params.contactId;
  const { id: owner } = req.user;

  const updatedContact = await updateContact(contactId, req.body, owner);

  res.status(200).json({ status: "success", updatedContact });
};

const updateContactStatusController = async (req, res) => {
  const contactId = req.params.contactId;
  const { id: owner } = req.user;
  const { favorite } = req.body;
  const updatedContact = await updateStatus(contactId, favorite, owner);

  res.status(200).json({ status: "success", updatedContact });
};

module.exports = {
  getContactsController,
  getByIdController,
  addContactController,
  deleteContactController,
  updateContactController,
  updateContactStatusController,
};
