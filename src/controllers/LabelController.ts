import { Request, Response, NextFunction } from 'express';

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
    return res.status(200).json({
      status: 'success',
      data: [],
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
    return res.status(200).json({
      status: 'success',
      data: [],
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
    return res.status(200).json({
      status: 'success',
      data: [],
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
    return res.status(200).json({
      status: 'success',
      data: [],
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
    return res.status(200).json({
      status: 'success',
      data: [],
    });
  }
}
