import crypto from 'crypto';
import bcryptjs from 'bcryptjs';

export const bcryptCompare = (
  actualString: string,
  hashedString: string,
): boolean => bcryptjs.compareSync(actualString, hashedString);

export const createHashedToken = (token: string): string => {
  return crypto.createHash('sha256').update(token).digest('hex');
};

export const resolveHashedToken = (token: string): string => {
  return crypto.createHash('sha256').update(token).digest('hex');
};

export const randomHexString = (length: number) => {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
};
