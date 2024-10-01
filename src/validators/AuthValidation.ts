import Joi from 'joi';

export const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().min(3).max(15).required(),
  password: Joi.string().min(3).max(60).required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(60).required(),
});

export const isValidEmailSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const updatePasswordSchema = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string().min(3).max(60).required(),
  confirmPassword: Joi.string().valid(Joi.ref('newPassword')).required(),
});

export const updateUsernameSchema = Joi.object({
  username: Joi.string().min(2).max(15).required(),
});
