import { Express } from 'express';
import compression from 'compression';

export const useCompression = (app: Express) => {
  app.use(compression());
};

export default useCompression;
