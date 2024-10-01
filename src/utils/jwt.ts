import jwt, { JwtPayload } from 'jsonwebtoken';

export const createJWTAccessToken = (payload: Record<string, any>) => {
  return jwt.sign(payload, `${process.env.JWT_ACCESS_TOKEN_SECRET}`, {
    expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
  });
};

export const createJWTRefreshToken = (payload: Record<string, any>) => {
  return jwt.sign(payload, `${process.env.JWT_REFRESH_TOKEN_SECRET}`, {
    expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
  });
};

export const createJWTResetToken = (payload: Record<string, any>) => {
  return jwt.sign(payload, `${process.env.JWT_RESET_TOKEN_SECRET}`, {
    expiresIn: process.env.JWT_RESET_TOKEN_EXPIRES_IN,
  });
};

export const decodeJWTToken = (
  token: string,
  signingKey: string,
  options = {},
): Promise<JwtPayload> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, signingKey, options, function (onError, onSuccess) {
      if (onError) return reject(onError);
      resolve(onSuccess as JwtPayload);
    });
  });
};
