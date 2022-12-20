import { Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { IUserRequest, IUserUpdate } from "../interfaces/users";
import { createUserService, getUsersService, updateUserService, deleteUserService } from "../services/users.services";

export const postUserController = async (req: Request, res: Response) => {
    try {
      const userData: IUserRequest = req.body;
      const newUser = await createUserService(userData);
  
      return res.status(201).json(newUser);
    } catch (error: unknown) {
        if(error instanceof AppError){
      throw new AppError(error.message, 400);
        }
    }
  };

  export const getUsersController = async (req: Request, res: Response) => {
    try {
      const users = await getUsersService();
  
      return res.status(200).json(users);
    } catch (error: unknown) {
        if(error instanceof AppError){
      throw new AppError(error.message, 400);
        }
    }
   };

   export const patchUserController = async (req: Request, res: Response) => {
    try {
      const data = req.body;
      const currentUser = req.user;
      const { id } = req.params;

      
  
      const userUpdated = await updateUserService(data, id, currentUser);
  
      return res.status(200).json(userUpdated);
       
    } catch (error: unknown) {
      if (error instanceof AppError) {
        throw new AppError(error.message, 401);
      }
    }
  };

  export const deleteUsersController = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const users = await deleteUserService(id)
        
        return res.status(204).json(users)
    } catch (error: unknown) {
      if (error instanceof AppError) {
        throw new AppError(error.message, 400)
      }
    }
};
