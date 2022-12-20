import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

import AppDataSource from "../data-source";
import { User } from "../entities/users.entity";
import { AppError } from "../errors/AppError";
import { IUserLogin } from "../interfaces/users";

export const loginService = async ({
  email,
  password,
}: IUserLogin): Promise<string> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ email: email });
  if (!user) {
    throw new AppError("Email or password is invalid", 403);
  }

  const correctPass = await compare(password, user.password);
  if (!correctPass) {
    throw new AppError("Email or password is invalid", 403);
  }

  const token = jwt.sign(
    { email: user.email },
    process.env.SECRET_KEY!,
    {
      expiresIn: "1d",
      subject: user.id,
    }
  );

  return token;
};