export interface IUser {
  id: string;
  email: string;
  username: string;
  passwordSalt: string;
  password: string;
  avatar: string;
  isEnabled: boolean | string;
  passwordLastUpdatedAt: Date;
}
