import AppDataSource from '../data-source';
import { IUserRequest, IUserUpdate, IUser } from '../interfaces/users';
import { User } from '../entities/users.entity';
import { AppError } from '../errors/AppError';
import { removedPasswordSchema } from '../schemas/users.schema';


export const createUserService = async(userData: IUserRequest): Promise<IUser> => {
    
    const userRepository = AppDataSource.getRepository(User)

    const createdUser = userRepository.create(userData)

    await userRepository.save(createdUser)
    const deletedPassUser = await removedPasswordSchema.validate(
        createdUser, { stripUnknown: true });
    
      return deletedPassUser
}

export const getUsersService = async (): Promise<User[]> => {

    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();
  
    return users;
  };


  export const updateUserService = async (
    data: IUserUpdate,
    id: string,
    currentUser: any
  ): Promise<IUser> => {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ id: id });
    const userId = user!.id;

    if (!currentUser.isAdm && currentUser.id !== id) {
      throw new AppError("Unauthorized", 401)
   }

    if (
      data.hasOwnProperty('isAdm') ||
      data.hasOwnProperty('id') ||
      data.hasOwnProperty('isActive')
  ) {
    throw new AppError("Unable to update this field", 401);
  }

  const updatedUser = await userRepository.update(userId, {
    ...data,
    updatedAt: new Date(),
  });

  const removedPassUser = await removedPasswordSchema.validate(
    updatedUser, { stripUnknown: true });

  return removedPassUser;
};


export const deleteUserService = async (id: string) => {
    const userRepository = AppDataSource.getRepository(User);
    const selectedUser = await userRepository.findOneBy({id: id});
  
    if (!selectedUser?.isActive) {
      throw new AppError(`User not found`, 404);
    }
  
    await userRepository.update(id, { isActive: false });
  
    return [204];
  };
  