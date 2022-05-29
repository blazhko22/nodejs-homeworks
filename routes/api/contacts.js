const express = require('express');
const contacts = require('../../models/contacts');
const Joi = require('joi');

const router = express.Router();
const schema = Joi.object({
  name: Joi.string().min(4).required(),
  email: Joi.string().email({ minDomainSegments: 2, multiple: true }).required(),
  phone: Joi.string().min(10).required(),
})

router.get('/', async (req, res, next) => {
  try {
    const all = await contacts.listContacts();
    res.json(all);
  } catch (e) {
    next(e);
  }
  
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contacts.getContactById(contactId);
    if(!contact) {
      res.status(404).json({message: "Not found"});
    }
    res.json(contact);
  } catch (e) {
    next(e);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if(error) {
      res.status(400).json({message: "missing required name field"});
    }
    const { name, email, phone } = req.body;
    const contact = await contacts.addContact(name, email, phone);
    res.status(201).json(contact)
  } catch (e) {
    next(e);
  } 
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contacts.removeContact(contactId);
    if(!contact) {
      res.status(404).json({message: "Not found"});
    }
    res.status(204).json()
  } catch (e) {
    next(e);
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if(error) {
      res.status(400).json({message: "missing fields"});
    }
    const { name, email, phone } = req.body;
    const { contactId } = req.params;
    const contact = await contacts.updateContact(contactId, name, email, phone);
    if(!contact) {
      res.status(404).json({message: "Not found"});
    } else {
      res.status(200).json(contact)
    }
  } catch (e) {
    next(e);
  }
})

module.exports = router;
