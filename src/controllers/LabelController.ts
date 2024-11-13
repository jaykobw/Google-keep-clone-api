import { Request, Response, NextFunction } from 'express';
import { Label } from '../models/Label';
import AppError from '../utils/ErrorHelper';
import { labelSchema } from '../validators/LabelValidation';
import joiValidationOptions from '../validators/ValidationConfig';
import { ILabel } from '../types/Label';

export default class LabelController {
  /**
   * Get all user labels
   * @param req Express.request
   * @param res Express.response
   * @param next Express.nextFunction
   * @returns {Promise<void | Response<void | Record<string, any>>>}
   */
  static async index(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response<void | Record<string, any>>> {
    const userId = (req as Record<string, any>)?.user?.id;

    const allLabels = await Label.findAll({
      attributes: {
        exclude: ['userId', 'createdAt', 'updatedAt'],
      },
      where: {
        userId,
      },
    });

    if (!allLabels) {
      return next(new AppError('An internal error occured', 400));
    }

    return res.status(200).json({
      status: 'success',
      data: allLabels,
    });
  }

  /**
   * Get single label by ID
   * @param req Express.request
   * @param res Express.response
   * @param next Express.nextFunction
   * @returns {Promise<void | Response<void | Record<string, any>>>}
   */
  static async show(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response<void | Record<string, any>>> {
    const userId = (req as Record<string, any>)?.user?.id;
    const labelId = req.params?.id;

    const labelItem = await Label.findOne({
      attributes: {
        exclude: ['userId', 'createdAt', 'updatedAt'],
      },
      where: {
        id: labelId,
        userId: userId,
      },
    });

    if (!labelItem) {
      return next(new AppError('Label not found', 400));
    }

    return res.status(200).json({
      status: 'success',
      data: labelItem,
    });
  }

  /**
   * Create new label
   * @param req Express.request
   * @param res Express.response
   * @param next Express.nextFunction
   * @returns {Promise<void | Response<void | Record<string, any>>>}
   */
  static async store(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response<void | Record<string, any>>> {
    const userId = (req as Record<string, any>)?.user?.id;

    const labelValidation = labelSchema.validate(
      req.body,
      joiValidationOptions,
    );

    if (labelValidation.error) {
      return next(new AppError(labelValidation.error.message, 400));
    }

    const newLabel = (await Label.create({ ...req.body, userId })) as ILabel;

    if (!newLabel) {
      return next(new AppError('Failed to create label', 400));
    }

    return res.status(201).json({
      status: 'success',
      data: newLabel,
    });
  }

  /**
   * Update label by ID
   * @param req Express.request
   * @param res Express.response
   * @param next Express.nextFunction
   * @returns {Promise<void | Response<void | Record<string, any>>>}
   */
  static async update(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response<void | Record<string, any>>> {
    const labelId = req.params?.id;

    if (!labelId) {
      return next(new AppError('Label id is required', 400));
    }

    const labelValidation = labelSchema.validate(
      req.body,
      joiValidationOptions,
    );

    if (labelValidation.error) {
      return next(new AppError(labelValidation.error.message, 400));
    }

    const idExists = await Label.findByPk(labelId);

    if (!idExists) {
      return next(new AppError('Label not found', 400));
    }

    const updateLabel = await Label.update(
      {
        title: req.body?.title,
      },
      {
        where: {
          id: labelId,
        },
      },
    );

    if (!updateLabel) {
      return next(new AppError('Failed to update label', 400));
    }

    return res.status(200).json({
      status: 'success',
      message: 'Label update succesfully',
      data: {
        title: req.body?.title,
      },
    });
  }

  /**
   * Destroy label by ID
   * @param req Express.request
   * @param res Express.response
   * @param next Express.nextFunction
   * @returns {Promise<void | Response<void | Record<string, any>>>}
   */
  static async destroy(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response<void | Record<string, any>>> {
    const labelId = req.params?.id;

    if (!labelId) {
      return next(new AppError('Label id is required', 400));
    }

    const deleteLabel = await Label.destroy({
      where: {
        id: labelId,
      },
    });

    if (!deleteLabel) {
      return next(new AppError('Failed to delete label', 400));
    }

    return res.status(204).json({
      status: 'success',
      message: 'Label delete succesfully',
    });
  }
}
