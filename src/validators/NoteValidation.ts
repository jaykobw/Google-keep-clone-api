import Joi from 'joi';

export const noteValidation = Joi.object({
  title: Joi.string().min(1).max(255).required(),
  content: Joi.string().optional(),
  labelId: Joi.string().optional(),
  tileColor: Joi.string().optional(),
});
