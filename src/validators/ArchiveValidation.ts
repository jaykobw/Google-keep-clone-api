import Joi from 'joi';

export const acrhiveSchema = Joi.object({
  status: Joi.boolean().required(),
});
