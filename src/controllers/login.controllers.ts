import { Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { loginService } from "../services/login.services";
import { IUserLogin } from "../interfaces/users";

export const loginUserController = async (req: Request, res: Response) => {
    try {
      const data: IUserLogin = req.body;
      const token = await loginService(data);
      
      return res.json({token});
    } catch (error: unknown) {
      if (error instanceof AppError) {
        throw new AppError(error.message, 403)
        };
      }
}
  