import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/ErrorHelper';
import { Note } from '../models/Note';
import { Label } from '../models/Label';
import { acrhiveSchema } from '../validators/ArchiveValidation';
import joiValidationOptions from '../validators/ValidationConfig';

export default class ArchiveController {
  /**
   * Get all user archived notes
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

    const allArchivedNotes = await Note.findAll({
      attributes: {
        exclude: ['userId', 'createdAt', 'updatedAt'],
      },
      include: [
        {
          model: Label,
          as: 'label',
          attributes: ['title'],
        },
      ],
      where: {
        userId,
        isArchived: true,
      },
    });

    if (!allArchivedNotes) {
      return next(new AppError('Failed to get archived notes', 400));
    }

    return res.status(200).json({
      status: 'success',
      data: allArchivedNotes,
    });
  }

  /**
   * Update note archive status
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
    const noteId = req.params?.id;

    if (!noteId) {
      return next(new AppError('Note Id is required', 400));
    }

    const acrhiveValidation = acrhiveSchema.validate(
      req.body,
      joiValidationOptions,
    );

    if (acrhiveValidation.error) {
      return next(new AppError(acrhiveValidation.error.message, 400));
    }

    const noteIdExists = await Note.findByPk(noteId);

    if (!noteIdExists) {
      return next(new AppError('Note does not exist', 400));
    }

    const updateNote = await Note.update(
      {
        isArchived: req.body?.status,
      },
      {
        where: {
          noteId,
        },
      },
    );

    if (!updateNote) {
      return next(new AppError('Failed to update note archive status', 400));
    }

    return res.status(200).json({
      status: 'success',
      data: {
        isArchived: req.body?.status,
      },
    });
  }
}
