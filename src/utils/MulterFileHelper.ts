import { Request, Response, NextFunction } from 'express';
import multer, { FileFilterCallback } from 'multer';
import AppError from './ErrorHelper';

const multerStorage = multer.memoryStorage();

const multerFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image', 400) as any, false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export const uploadProfilePhoto = upload.single('avatar');
