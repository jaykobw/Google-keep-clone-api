import { Express } from 'express';
import cookieParser from 'cookie-parser';

const useCookieParser = (app: Express) => {
  app.use(cookieParser());
};

export default useCookieParser;
