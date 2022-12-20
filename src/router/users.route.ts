import { Router} from "express";
import { deleteUsersController, getUsersController, patchUserController, postUserController } from "../controllers/users.controllers";
import { emailAlreadyExistsMiddleware, confirmTokenMiddleware, isAdmMiddleware, userIsActiveMiddleware } from "../middlewares/users.middlewares";


export const usersRouter = Router();

usersRouter.post("", emailAlreadyExistsMiddleware, postUserController)
usersRouter.get("", confirmTokenMiddleware, isAdmMiddleware, getUsersController)
usersRouter.patch("/:id", confirmTokenMiddleware, userIsActiveMiddleware, patchUserController)
usersRouter.delete("/:id", confirmTokenMiddleware, isAdmMiddleware, userIsActiveMiddleware, deleteUsersController)