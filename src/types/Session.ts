export interface ISession {
  id: string;
  userId: string;
  name: string;
  token: string;
  sessionIP: string;
  sessionUserAgent: string;
  sessionOS: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
