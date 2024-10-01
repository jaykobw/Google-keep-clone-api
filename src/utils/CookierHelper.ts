import { CookieOptions, Request, Response } from 'express';

export default class Cookie {
  /**
   *
   * @param res Express.Response
   * @param cookieName Provide cookie name
   * @param cookieValue Provide a cookie value
   * @param cookieOptions Provide cookie options
   * @returns Express.Cookie
   */
  static createCookie(
    res: Response,
    cookieName: string,
    cookieValue: string,
    cookieOptions: CookieOptions,
  ) {
    return res.cookie(cookieName, cookieValue, cookieOptions);
  }

  /**
   *
   * @param req Express.Request
   * @returns {Record<string, any>}
   */
  static getCookie(req: Request): Record<string, any> {
    return req.cookies;
  }
}
