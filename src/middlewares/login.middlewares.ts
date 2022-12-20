import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/users.entity";
import { AppError } from "../errors/AppError";

export const confirmUserMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { email } = req.body;
  
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.findOneBy({ email: email });
  
    if (!users) {
      throw new AppError("Invalid user/password")
    }
  
    next();
  };
  