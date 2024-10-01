import express from 'express';
import path from 'path';
import useHelmet from './config/Helmet';
import useCors from './config/Cors';
import useRateLimiter from './config/RateLimiter';
import useCookieParser from './config/CookieParser';
import useCompression from './config/Compression';
import useMorgan from './config/Morgan';
import useHpp from './config/Hpp';
import RoutesRegister from './routes';
import AppErrorHandler from './controllers/ErrorController';

const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

useHelmet(app);
useCors(app);
useRateLimiter(app);
useCookieParser(app);
useCompression(app);
useMorgan(app);
useHpp(app);

RoutesRegister(app);

app.use(AppErrorHandler);

export default app;
