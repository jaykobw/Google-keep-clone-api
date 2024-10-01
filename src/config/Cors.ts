import { Express } from 'express';
import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv';

dotenv.config({
  path: './.env',
});

const useCors = (app: Express) => {
  const corsConfig: CorsOptions = {
    origin: process.env.APP_ORIGIN_URL,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  };
  app.use(cors(corsConfig));
};

export default useCors;
