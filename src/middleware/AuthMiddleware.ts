import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import requestIP from 'request-ip';
import AppError from '../utils/ErrorHelper';
import {
  createJWTAccessToken,
  createJWTRefreshToken,
  decodeJWTToken,
} from '../utils/jwt';
import { Session } from '../models/Session';
import { JwtPayload } from 'jsonwebtoken';
import { ISession } from '../types/Session';
import { User } from '../models/User';
import Cookie from '../utils/CookierHelper';
import { UserAgentParser } from '../utils/UserAgentParser';

export default async (req: Request, res: Response, next: NextFunction) => {
  const accessTokenCookie =
    Cookie.getCookie(req)[`${process.env.JWT_ACCESS_COOKIE_NAME}`];
  const refreshTokenCookie =
    Cookie.getCookie(req)[`${process.env.JWT_REFRESH_COOKIE_NAME}`];

  let jwtAccessCookieDecoded: JwtPayload;

  if (!refreshTokenCookie) {
    res.clearCookie(`${process.env.JWT_ACCESS_COOKIE_NAME}`);
    res.clearCookie(`${process.env.JWT_REFRESH_COOKIE_NAME}`);
    return next(new AppError('You are not logged in!', 401));
  }

  if (accessTokenCookie) {
    jwtAccessCookieDecoded = await decodeJWTToken(
      accessTokenCookie,
      `${process.env.JWT_ACCESS_TOKEN_SECRET}`,
    );
  }

  const jwtRefreshCookieDecoded = await decodeJWTToken(
    refreshTokenCookie,
    `${process.env.JWT_REFRESH_TOKEN_SECRET}`,
  );

  // check if session is expired
  const activeSession = (await Session.findOne({
    where: {
      token: jwtRefreshCookieDecoded?.token,
    },
  })) as ISession;

  if (!activeSession) {
    res.clearCookie(`${process.env.JWT_ACCESS_COOKIE_NAME}`);
    res.clearCookie(`${process.env.JWT_REFRESH_COOKIE_NAME}`);
    return next(new AppError('You are not logged in!', 401));
  }

  const dbDate = new Date(activeSession.expiresAt);
  const sysDate = new Date();

  if (sysDate > dbDate) {
    res.clearCookie(`${process.env.JWT_ACCESS_COOKIE_NAME}`);
    res.clearCookie(`${process.env.JWT_REFRESH_COOKIE_NAME}`);
    return next(new AppError('You are not logged in!', 401));
  }

  // Check if user still exists
  const userExists = await User.findOne({
    where: {
      id: activeSession?.userId,
    },
  });

  if (!userExists) {
    res.clearCookie(`${process.env.JWT_ACCESS_COOKIE_NAME}`);
    res.clearCookie(`${process.env.JWT_REFRESH_COOKIE_NAME}`);
    return next(new AppError('You are not logged in!', 401));
  }

  // renew refresh token
  const jwtAccessToken = createJWTAccessToken({
    id: userExists?.id,
    username: userExists?.username,
  });

  (req as Record<string, any>).user = userExists;
  res.locals.user = userExists;

  if (!accessTokenCookie) {
    Cookie.createCookie(
      res,
      `${process.env.JWT_ACCESS_COOKIE_NAME}`,
      jwtAccessToken,
      {
        expires: new Date(Date.now() + 6 + 3600 * 1000), // 1 hour
        httpOnly: true,
        secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
      },
    );
  }

  // create a new refresh token if old token is invalid
  if (!refreshTokenCookie) {
    if (accessTokenCookie) {
      jwtAccessCookieDecoded = await decodeJWTToken(
        accessTokenCookie,
        `${process.env.JWT_ACCESS_TOKEN_SECRET}`,
      );

      const user = await User.findOne({
        where: {
          id: jwtAccessCookieDecoded?.id,
        },
      });

      if (!user) {
        res.clearCookie(`${process.env.JWT_ACCESS_COOKIE_NAME}`);
        res.clearCookie(`${process.env.JWT_REFRESH_COOKIE_NAME}`);
        return next(new AppError('You are not logged in!', 401));
      }

      const sessionPayload = {
        userId: user?.id,
        token: uuidv4(),
        sessionIP: requestIP.getClientIp(req),
        sessionUserAgent: req.header('user-agent'),
        sessionOS: UserAgentParser(req.header('user-agent') as string),
        expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000,
      };

      const sessionCreated = await Session.create(sessionPayload);

      if (!sessionCreated) {
        return next(new AppError('An internal error occured', 500));
      }

      const jwtRefreshToken = createJWTRefreshToken({
        token: sessionCreated?.token,
      });

      Cookie.createCookie(
        res,
        `${process.env.JWT_REFRESH_COOKIE_NAME}`,
        jwtRefreshToken,
        {
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
          httpOnly: true,
          secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
        },
      );

      (req as Record<string, any>).user = user;
      res.locals.user = user;
    }
  }

  next();
};
