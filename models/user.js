const {Schema, model} = require('mongoose');
const Joi = require("joi");

const schema = new Schema({
    password: {
      type: String,
      required: [true, 'Set password for user'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter"
    },
    token: String
  }, {timestamps: true});

const User = model('user', schema);

const schemaRegister = Joi.object({    
    password: Joi.string().required(),
    email: Joi.string().required(),
    subscription: Joi.string(),
});

const schemaLogin = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
});

module.exports = {
    User, schemaRegister, schemaLogin,
}