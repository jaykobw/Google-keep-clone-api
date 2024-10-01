export interface INote {
  id: string;
  userId: string;
  title: string;
  content: string;
  tileColor: string;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
}
