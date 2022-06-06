const { contacts, email } = require('../services');
const {addError} = require('../errors/errors');

const listContacts = async (req, res, next) => {
    try {
        const all = await contacts.listContacts();
        email.sendEmail();
        res.json(all);
    } catch (e) {
        next(e);
    }
}

const getContactById = async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const contact = await contacts.getContactById(contactId);
      if(!contact) {
          throw addError(404, "Not found");
      }
      res.json(contact);
    } catch (e) {
      next(e);
    }
}

const addContact = async (req, res, next) => {
    try {
      const contact = await contacts.addContact(req.body);
      res.status(201).json(contact)
    } catch (e) {
      next(e);
    } 
}

const removeContact = async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const contact = await contacts.removeContact(contactId);
      if(!contact) {
        throw addError(404, "Not found");
      }
      res.status(204).json()
    } catch (e) {
      next(e);
    }
}

const updateContact = async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const contact = await contacts.updateContact(contactId, req.body);
      if(!contact) {
        throw addError(404, "Not found");
      } else {
        res.status(200).json(contact)
      }
    } catch (e) {
      next(e);
    }
}

const updateFavorite = async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const contact = await contacts.updateContact(contactId, req.body);
      if(!contact) {
        throw addError(404, "Not found");
      } else {
        res.status(200).json(contact)
      }
    } catch (e) {
      next(e);
    }
}

module.exports = {
    listContacts, getContactById, addContact, removeContact, updateContact, updateFavorite
}