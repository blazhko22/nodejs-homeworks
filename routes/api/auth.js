const express = require('express');
const {registerUser, loginUser, logoutUser} = require('../../controllers/auth');
const {schemaRegister, schemaLogin} = require('../../models/user');
const {validateError} = require('../../middlewares/validateError');
const router = express.Router();
const {auth} = require('../../middlewares/auth');

router.post('/users/registration', validateError(schemaRegister), registerUser);
router.post('/users/login', validateError(schemaLogin), loginUser);
router.post('/users/logout', auth, logoutUser);

module.exports = router;