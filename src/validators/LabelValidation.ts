import Joi from 'joi';

export const labelSchema = Joi.object({
  title: Joi.string().min(1).max(60).required(),
});
