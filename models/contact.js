const {Schema, model} = require('mongoose');
const Joi = require('joi');

const schema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
});

const schemaAdd = Joi.object({
  name: Joi.string().min(1).required(),
  email: Joi.string().email({ minDomainSegments: 2, multiple: true }).required(),
  phone: Joi.string().required(),
});

const schemaUpdate = Joi.object({
  name: Joi.string().min(3).required(),
  owner: Joi.bool(),
});

const schemaPatch = Joi.object({
  available: Joi.bool().required(),
});

const Contact = model('contact', schema);

module.exports = {
  Contact, schemaPatch, schemaAdd, schemaUpdate
}