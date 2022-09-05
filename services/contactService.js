const { Contact } = require("../db/contactModel");
const { WrongParametersError } = require("../helpers/errors");

const getContacts = async () => {
  const contacts = await Contact.find();
  return contacts;
};

const getContactById = async (id) => {
  const contact = await Contact.findById(id);
  if (!contact) {
    throw new WrongParametersError(
      `Failure, contact with id: ${id} was not found`
    );
  }
  return contact;
};

const addContact = async (body) => {
  const contact = new Contact(body);
  await contact.save();
};

const deleteContact = async (id) => {
  const contact = await Contact.findByIdAndRemove(id);
  if (!contact) {
    throw new WrongParametersError(
      `Failure, contact with id: ${id} was not found`
    );
  }
  return contact;
};

const updateContact = async (id, body) => {
  const contact = await Contact.findByIdAndUpdate(id, body, {
    returnDocument: "after",
  });
  if (!contact) {
    throw new WrongParametersError(
      `Failure, contact with id: ${id} was not found`
    );
  }
  return contact;
};

const updateStatus = async (id, favorite) => {
  const contact = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    {
      returnDocument: "after",
    }
  );
  if (!contact) {
    throw new WrongParametersError(
      `Failure, contact with id: ${id} was not found`
    );
  }
  return contact;
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
  updateStatus,
};
