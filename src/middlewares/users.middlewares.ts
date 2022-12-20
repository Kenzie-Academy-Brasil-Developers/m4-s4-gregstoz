import { Request, Response, NextFunction } from 'express';
import AppDataSource from '../data-source';
import { User } from '../entities/users.entity';
import jwt from 'jsonwebtoken';
import { AppError } from '../errors/AppError';

export const emailAlreadyExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {

  const { email } = req.body;

  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();

  const emailAlreadyExists = users.find((user) => user.email === email);

  if (emailAlreadyExists) {

    return res.status(400).json({
      message: 'Email already exists',
    });

  }

  next();
};

export const userIsActiveMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userRepository = AppDataSource.getRepository(User);
  const { id } = req.params;
  const user = await userRepository.findOneBy({ id: id });

  if (!user) {
    throw new AppError("User don't exists", 404);
  }

  next();
};

export const isAdmMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id: req.user.id });
  if (!user?.isAdm) {
    throw new AppError("Unauthorized", 403);
  }

  next();
};

export const confirmTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let auth = req.headers.authorization;
  if (!auth) {
    throw new AppError("Invalid Token", 401);
  }
  let token = auth.split(" ")[1];

  return jwt.verify(token, process.env.SECRET_KEY!, (error, decoded: any) => {
    if (error) {
      throw new AppError("Missing authorization headers", 401);
    }

    req.user = {
      id: decoded.sub,
    };

    next();
  });
};


