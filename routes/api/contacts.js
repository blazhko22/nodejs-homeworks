const express = require('express');
const {listContacts, getContactById, addContact, removeContact, updateContact, updateFavorite} = require('../../controllers/contacts');
const {schemaPatch, schemaAdd, schemaUpdate} = require('../../models/contact');
const {validateError, auth, author, validateId} = require('../../middlewares');
const router = express.Router();

router.get('/', auth, listContacts);
router.get('/:contactId', validateId, getContactById);
router.post('/', validateError(schemaAdd), auth, addContact);
router.delete('/:contactId', validateId, auth, author('admin'), removeContact);
router.put('/:contactId', validateId, auth, validateError(schemaUpdate), updateContact);
router.patch('/:contactId/favorite', validateId, validateError(schemaPatch), updateFavorite);

module.exports = router;