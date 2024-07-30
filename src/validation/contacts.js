import Joi from 'joi';
// Валідація данних від користувача
export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Name should be a string',
    'string.min': 'Name should be at least {#limit}',
    'string.max': 'Name should be at most {#limit} ',
  }),
  phoneNumber: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Name should be a string',
    'string.min': 'Name should be at least {#limit}',
    'string.max': 'Name should be at most {#limit} ',
  }),
  email: Joi.string().email().messages({
    'string.email': 'Email is not valid',
  }),
  isFavourite: Joi.boolean()
    .required()
    .messages({ 'any.required': 'isFavourite is required' }),
  contactType: Joi.string().valid('personal', 'home'),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string().min(3).max(20),
  email: Joi.string().email(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('personal', 'home'),
});
