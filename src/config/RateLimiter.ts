import { Express } from 'express';
import rateLimit from 'express-rate-limit';

const useRateLimiter = (app: Express) => {
  const limiter = rateLimit({
    limit: Number(process.env.RATE_LIMIT_MAX) || 100,
    windowMs: 60 * 60 * 1000,
    statusCode: 429,
    message: {
      status: 429,
      message: 'Too many requests from this IP',
    },
  });

  app.use('/api', limiter);
};

export default useRateLimiter;
