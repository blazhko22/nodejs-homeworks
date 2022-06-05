const express = require('express');
const {listContacts, getContactById, addContact, removeContact, updateContact, updateFavorite} = require('../../controllers/contacts');
const {schemaPatch, schemaAdd} = require('../../models/contact');
const {validateError} = require('../../middlewares/validateError');
const router = express.Router();

router.get('/', listContacts);
router.get('/:contactId', getContactById);
router.post('/', validateError(schemaAdd), addContact);
router.delete('/:contactId', removeContact);
router.put('/:contactId', updateContact);
router.patch('/:contactId/favorite', validateError(schemaPatch), updateFavorite);

module.exports = router;