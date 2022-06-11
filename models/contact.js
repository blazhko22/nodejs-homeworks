const {Schema, model, SchemaTypes} = require('mongoose');
const Joi = require('joi');

const schemaPatch = new Schema({
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
    type: SchemaTypes.ObjectId,
    ref: 'user',
  },
});

const schemaAdd = Joi.object({
  name: Joi.string().min(1).required(),
  email: Joi.string().email({ minDomainSegments: 2, multiple: true }).required(),
  phone: Joi.string().required(),
})

const Contact = model('contact', schemaPatch);

module.exports = {
  Contact, schemaPatch, schemaAdd
}