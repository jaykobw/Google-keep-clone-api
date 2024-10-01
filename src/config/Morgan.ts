import morgan from 'morgan';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { Express } from 'express';
import { getFullYear, getMonth, getDate } from '../utils/DateHelper';

dotenv.config({
  path: './.env',
});

const useMorgan = (app: Express, filename = 'morgan') => {
  if (
    process.env.LOG_REQUEST === 'enabled' ||
    process.env.LOG_REQUEST === undefined
  ) {
    const qualifiedFileName = `${filename}-${process.env.NODE_ENV}-${getFullYear()}-${getMonth()}-${getDate()}`;
    const writeLogStream = fs.createWriteStream(
      `${path.resolve(`./storage/logs/${qualifiedFileName}.log`)}`,
      {
        flags: 'a',
      },
    );

    app.use(morgan('combined', { stream: writeLogStream }));
  }
};

export default useMorgan;
