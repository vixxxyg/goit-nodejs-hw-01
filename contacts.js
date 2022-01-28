const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join("db/contacts.json");

const listContacts = async () => {
  // const contacts = await fs.readFile(contactsPath, "utf-8");
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (id) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === id);
  console.log("Founded such contact:");
  if (!result) {
    return null;
  }
  return result;
};

const addContact = async (name, email, phone) => {
  if (!name || !email || !phone) {
    console.log("Name, email and phone are required!");
    return null;
  }

  const data = { id: v4(), name, email, phone };
  const contacts = await listContacts();
  contacts.push(data);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  console.log("Contact have been added");
  return data;
};

const removeContact = async (id) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === id);
  if (idx === -1) {
    return null;
  }
  const deleteContact = contacts[idx];
  contacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  console.log("Contact have been deleted");
  return deleteContact;
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
