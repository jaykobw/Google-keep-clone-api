import { Express } from 'express';
import AuthRoutes from './AuthRoutes';
import NoteRoutes from './NoteRoutes';
import SessionRoutes from './SessionRoutes';
import UserRoutes from './UserRoutes';

const RoutesRegister = (app: Express) => {
  app.use('/api/auth/', AuthRoutes);
  app.use('/api/v1/user', UserRoutes);
  app.use('/api/v1/note', NoteRoutes);
  app.use('/api/v1/session', SessionRoutes);
};

export default RoutesRegister;
