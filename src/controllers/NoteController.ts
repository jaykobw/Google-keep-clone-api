import { Request, Response, NextFunction } from 'express';

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
    return res.status(200).json({
      status: 'success',
      data: [],
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
    return res.status(200).json({
      status: 'success',
      data: [],
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
    return res.status(201).json({
      status: 'success',
      data: [],
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
    return res.status(200).json({
      status: 'success',
      data: [],
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
    return res.status(204).json({
      status: 'success',
      data: [],
    });
  }
}
