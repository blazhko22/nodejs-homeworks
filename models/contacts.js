const fs = require('fs/promises');
const path = require('path');
const uuid = require('uuid');

const contactsPath = path.join(__dirname, './contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, 'utf8');
  const result = JSON.parse(data);
  return result;
}

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const contact = allContacts.find(contact => contact.id ===contactId);
  return contact || null; 
}

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex(contact => contact.id === contactId);
  const deletedContact = allContacts[index];
  if(index !== -1) {
      allContacts.splice(index, 1);
      await fs.writeFile(contactsPath, JSON.stringify(allContacts));
  }
  return deletedContact || null; 
}

const addContact = async (name, email, phone) => {
  const newContact = {
      id: uuid.v4(),
      name: name,
      email: email,
      phone: phone,
  };
  const allContacts = await listContacts();
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts)); 
  return newContact;   
}

const updateContact = async (contactId, name, email, phone) => {
  const allContacts = await listContacts();
  const contactIndex = allContacts.findIndex(contact => contact.id === contactId);
  if(contactIndex !== -1) {
    allContacts[contactIndex].name = name;
    allContacts[contactIndex].email = email;
    allContacts[contactIndex].phone = phone;

    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 3));
    return allContacts[contactIndex];
  } else {
    return null;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
