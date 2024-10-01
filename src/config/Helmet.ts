import { Express } from 'express';
import helmet from 'helmet';

const useHelmet = (app: Express) => {
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
    }),
  );
};

export default useHelmet;
