import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUser, IUserRequest, IUserUpdate } from "../interfaces/users";

export const createUsersSchema: SchemaOf<IUserRequest> = yup.object().shape({
  name: yup.string().min(2).trim().required(`Name is required`),
  password: yup.string().trim().required(`Password is required`),
  email: yup
    .string()
    .trim()
    .email(`Invalid email`)
    .required(`Valid email required`),
  isAdm: yup.boolean().required(`Role required`),
});

export const removedPasswordSchema: SchemaOf<IUser> = yup.object().shape({
  id: yup.string().uuid().required(),
  name: yup.string().min(2).trim().required(),
  email: yup.string().trim().email(`Invalid email`).required(),
  isAdm: yup.boolean().required(),
  createdAt: yup.date().required(),
  updatedAt: yup.date().required(),
  isActive: yup.boolean().required(),
});

export const updateUsersSchema: SchemaOf<IUserUpdate> = yup.object().shape({
  name: yup.string().min(2).trim(),
  email: yup.string().trim().email(),
  password: yup.string().trim()
});

export const listRemovedPassowrdSchema = yup.array(removedPasswordSchema);