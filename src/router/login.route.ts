import { Router} from "express";
import { loginUserController } from "../controllers/login.controllers";
import { confirmUserMiddleware } from "../middlewares/login.middlewares";

export const loginRouter = Router();

loginRouter.post("", confirmUserMiddleware, loginUserController)