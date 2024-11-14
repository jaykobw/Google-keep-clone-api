import { Express } from 'express';
import AuthRoutes from './AuthRoutes';
import UserRoutes from './UserRoutes';
import SessionRoutes from './SessionRoutes';
import LabelRoutes from './LabelRoutes';
import NoteRoutes from './NoteRoutes';
import ArchiveRoutes from './ArchiveRoutes';

const RoutesRegister = (app: Express): void => {
  app.use('/api/auth/', AuthRoutes);
  app.use('/api/v1/user', UserRoutes);
  app.use('/api/v1/session', SessionRoutes);
  app.use('/api/v1/note', NoteRoutes);
  app.use('/api/v1/label', LabelRoutes);
  app.use('/api/v1/archive', ArchiveRoutes);
};

export default RoutesRegister;
