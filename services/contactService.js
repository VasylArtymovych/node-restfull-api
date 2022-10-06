const { Contact } = require("../db");
const { WrongParametersError } = require("../helpers");

const getContacts = async (owner) => {
  const contacts = await Contact.find({ owner });
  return contacts;
};

const getContactById = async (contactId, owner) => {
  const contact = await Contact.findOne({ _id: contactId, owner });
  if (!contact) {
    throw new WrongParametersError(
      `Failure, contact with id: ${contactId} was not found`
    );
  }
  return contact;
};

const addContact = async ({ name, email, phone, favorite }, owner) => {
  const contact = await Contact.create({ name, email, phone, favorite, owner });
  return contact;
};

const deleteContact = async (contactId, owner) => {
  const contact = await Contact.findOneAndRemove({ _id: contactId, owner });
  if (!contact) {
    throw new WrongParametersError(
      `Failure, contact with id: ${contactId} was not found`
    );
  }
  return contact;
};

const updateContact = async (
  contactId,
  { name, email, phone, favorite },
  owner
) => {
  const contact = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    { name, email, phone, favorite },
    {
      returnDocument: "after",
    }
  );

  if (!contact) {
    throw new WrongParametersError(
      `Failure, contact with id: ${contactId} was not found`
    );
  }

  return contact;
};

const updateStatus = async (contactId, favorite, owner) => {
  const contact = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    { favorite },
    {
      returnDocument: "after",
    }
  );
  if (!contact) {
    throw new WrongParametersError(
      `Failure, contact with id: ${contactId} was not found`
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
