const {author, auth} = require('./auth');
const {validateId} = require('./verifyId');
const {validateError} = require('./validateError');

module.exports = {
    auth, author, validateId, validateError,
}