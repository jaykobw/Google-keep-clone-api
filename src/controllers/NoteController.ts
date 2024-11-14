import { Request, Response, NextFunction } from 'express';
import { noteSchema } from '../validators/NoteValidation';
import joiValidationOptions from '../validators/ValidationConfig';
import AppError from '../utils/ErrorHelper';
import { Note } from '../models/Note';
import { INote } from '../types/Note';
import { Label } from '../models/Label';

export default class NoteController {
  /**
   * Get all user notes
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

    const allNotes = await Note.findAll({
      attributes: {
        exclude: ['userId', 'createdAt', 'updatedAt'],
      },
      where: {
        userId,
      },
      include: [
        {
          model: Label,
          as: 'label',
          attributes: ['title'],
        },
      ],
    });

    if (!allNotes) {
      return next(new AppError('Failed to fetch notes', 400));
    }

    return res.status(200).json({
      status: 'success',
      data: allNotes,
    });
  }

  /**
   * Get single note by ID
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
    const noteId = req.params?.id;

    if (!noteId) {
      return next(new AppError('Note Id is required', 400));
    }

    const findNote = await Note.findOne({
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
        id: noteId,
        userId,
      },
    });

    if (!findNote) {
      return next(new AppError('Failed to find note', 400));
    }

    return res.status(200).json({
      status: 'success',
      data: findNote,
    });
  }

  /**
   * Create new note
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

    const noteValidation = noteSchema.validate(req.body, joiValidationOptions);

    if (noteValidation.error) {
      return next(new AppError(noteValidation.error.message, 400));
    }

    const newNote = (await Note.create({ ...req.body, userId })) as INote;

    if (!newNote) {
      return next(new AppError('Failed to create note', 400));
    }

    const noteResponse = await Note.findByPk(newNote.id, {
      attributes: {
        exclude: ['userId', 'isArchived', 'createdAt', 'updatedAt'],
      },
      include: [
        {
          model: Label,
          as: 'label',
          attributes: ['title'],
        },
      ],
    });

    if (!noteResponse) {
      return next(new AppError('An internal error occured', 400));
    }

    return res.status(201).json({
      status: 'success',
      data: noteResponse,
    });
  }

  /**
   * Update note by ID
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

    const noteValidation = noteSchema.validate(req.body, joiValidationOptions);

    if (noteValidation.error) {
      return next(new AppError(noteValidation.error.message, 400));
    }

    const updateNote = await Note.update(
      {
        ...req.body,
      },
      {
        where: {
          id: noteId,
        },
      },
    );

    if (!updateNote) {
      return next(new AppError('Failed to update note', 400));
    }

    return res.status(200).json({
      status: 'success',
      message: 'Note updated succesfully',
    });
  }

  /**
   * Destroy note by ID
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
    const userId = (req as Record<string, any>)?.user?.id;
    const noteId = req.params?.id;

    if (!noteId) {
      return next(new AppError('Note Id is required', 400));
    }

    const deleteNote = await Note.destroy({
      where: {
        id: noteId,
        userId,
      },
    });

    if (!deleteNote) {
      return next(new AppError('Failed to delete note', 400));
    }

    return res.status(204).json({
      status: 'success',
      message: 'Note deleted succesfully',
    });
  }
}
