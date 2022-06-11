const {User} = require('../models/user');
const {addError} = require('../errors/errors');
require('dotenv').config();
const { SECRET_KEY } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (userPass) => {
    const result = await User.findOne({email: userPass.email});
    if(result) {
        throw addError(409, "Email in use")
    }
    const password = userPass.password;
    const heshedPassword = await bcrypt.hash(password, 10);

    return User.create({
        ...userPass,
        password: heshedPassword,
    });
}

const loginUser = async ({email, password}) => {
    const user = await User.findOne({email});
    if(!user) {
        throw addError(401, "Email or password is wrong");
    }
    const isValid = await bcrypt.compare(password, user.password);
    if(!isValid) {
        throw addError(401, "Email or password is wrong");
    }
    const payload = {
        id: user._id,
        role: user.role,
    };
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '1h'});
    await User.findByIdAndUpdate(user._id, {token})
    return {
        token
    }
}

const logoutUser = async (id) => {
    await User.findByIdAndUpdate(id, {token: null})
}

const authenticateUser = async (token) => {
    try {
        const payload = jwt.verify(token, SECRET_KEY);
        const {id} = payload;
        const user = await User.findById(id);

        return user.token !== token ? null : user;
    } catch (e) {
        return null;
    }
}

module.exports = {
    registerUser, loginUser, authenticateUser, logoutUser,
}