import { Express } from 'express';
import hpp from 'hpp';

export const useHpp = (app: Express) => {
  app.use(hpp());
};

export default useHpp;
