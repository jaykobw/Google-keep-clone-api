import { Request, Response, NextFunction } from 'express';
import sharp from 'sharp';
import { User } from '../models/User';
import AppError from '../utils/ErrorHelper';
import {
  updatePasswordSchema,
  updateUsernameSchema,
} from '../validators/AuthValidation';
import joiValidationOptions from '../validators/ValidationConfig';
import { bcryptCompare } from '../utils/Hashlib';

export default class UserController {
  /**
   * Get current logged in user profile
   * @param req Express.Request
   * @param res Express.Response
   * @param next Express.NextFunction
   * @returns {Promise<void | Response<void | Record<string, any>>>}
   */
  static async getUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response<void | Record<string, any>>> {
    const userId = (req as Record<string, any>)?.user?.id;

    const user = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return next(new AppError('User not found', 401));
    }

    return res.status(200).json({
      status: 'success',
      data: {
        email: user?.email,
        username: user?.username,
        avatar: `${process.env.APP_URL}/public/images/user/${user?.avatar}`,
      },
    });
  }

  /**
   * Update username
   * @param req Express.Request
   * @param res Express.Response
   * @param next Express.NextFunction
   * @returns {Promise<void | Response<void | Record<string, any>>>}
   */
  static async updateUsername(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response<void | Record<string, any>>> {
    const usernameValidation = updateUsernameSchema.validate(
      req.body,
      joiValidationOptions,
    );

    if (usernameValidation.error) {
      return next(new AppError(usernameValidation.error.message, 400));
    }

    const userId = (req as Record<string, any>)?.user?.id;

    const updateUsername = await User.update(
      {
        username: req.body?.username,
      },
      {
        where: {
          id: userId,
        },
      },
    );

    if (!updateUsername) {
      return next(new AppError('An internal error occured', 400));
    }

    return res.status(200).json({
      status: 'success',
      message: 'Username updated succesfully',
      data: {
        username: req.body?.username,
      },
    });
  }

  /**
   * Update password
   * @param req Express.Request
   * @param res Express.Response
   * @param next Express.NextFunction
   * @returns {Promise<void | Response<void | Record<string, any>>>}
   */
  static async updatePassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response<void | Record<string, any>>> {
    const passwordValidation = updatePasswordSchema.validate(
      req.body,
      joiValidationOptions,
    );

    if (passwordValidation.error) {
      return next(new AppError(passwordValidation.error.message, 400));
    }

    const userId = (req as Record<string, any>)?.user?.id;

    const currentUser = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (!currentUser) {
      return next(new AppError('An internal error occured!', 400));
    }

    const comparePwd = bcryptCompare(
      req.body.currentPassword,
      currentUser?.password,
    );

    if (!comparePwd) {
      return next(new AppError('Current password does not match', 400));
    }

    const updatePassword = await User.update(
      {
        password: req.body?.password,
        passwordLastUpdatedAt: Date.now(),
      },
      {
        where: {
          id: userId,
        },
      },
    );

    if (!updatePassword) {
      return next(new AppError('An internal error occured', 400));
    }

    return res.status(200).json({
      status: 'success',
      message: 'Password updated succesfully',
    });
  }

  /**
   * Update user avatar
   * @param req Express.Request
   * @param res Express.Response
   * @param next Express.NextFunction
   * @returns {Promise<void | Response<void | Record<string, any>>>}
   */
  static async updateAvatar(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response<void | Record<string, any>>> {
    if (!req.file) return next(new AppError('No file uploaded', 400));
    const userId = (req as Record<string, any>)?.user?.id;

    req.file.filename = `user-${(req as Record<string, any>).user?.username}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/images/user/${req.file.filename}`);

    const updateAvatar = await User.update(
      {
        avatar: req.file.filename,
      },
      {
        where: {
          id: userId,
        },
      },
    );

    if (!updateAvatar) {
      return next(new AppError('An internal error occured', 400));
    }

    return res.status(200).json({
      status: 'success',
      message: 'Avatar updated succesfully',
      data: {
        avatar: `${process.env.APP_URL}/public/images/user/${req.file?.filename}`,
      },
    });
  }
}
