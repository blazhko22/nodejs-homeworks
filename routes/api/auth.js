const express = require('express');
const router = express.Router();
const {registerUser, loginUser, logoutUser, confirm, resend} = require('../../controllers/auth');
const {schemaRegister, schemaLogin} = require('../../models/user');
const {validateError} = require('../../middlewares/validateError');
const {auth} = require('../../middlewares/auth');

router.post('/users/registration', validateError(schemaRegister), registerUser);
router.post('/users/login', validateError(schemaLogin), loginUser);
router.post('/users/logout', auth, logoutUser);
router.get('/verify/:verificationToken', confirm);
router.post('/verify', resend);

module.exports = router;