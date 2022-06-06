const {addError} = require('../errors/errors');

const validateError = (schema) => {
    return (req, res, next) => {
        const {error} = schema.validate(req.body);
        if(error) {
            next(addError(400, error.message));
        }
        next();
    }
}

module.exports = {
    validateError
}