const {authenticateUser} = require('../services/auth.service');
const authError = {status: 401, message: "Not authorized"};

const auth = async (req, res, next) => {
     const {authorization = ""} = req.headers;
     const [bearer, token] = authorization.split(' ');

     if(bearer !== 'Bearer' || !token) {
         next(authError);
     }

     const user = await authenticateUser(token);
     if(!user) {
         next(authError);
     }
     req.user = user;
     next();
}

const author = (subscription) => {
    return (req, res, next) => {
        if(req.user.subscription !== subscription){
            next(authError);
        }
        next();
    }
}

module.exports = {
    auth, author,
};