import { Model } from 'mongoose';

export interface IPasswordHistory {
  password: string;
  time: Date;
}

export interface TUser {
  username: string;
  email: string;
  password: string;
}

export interface TLoginUser {
  email: string;
  password: string;
}

export interface UserModel extends Model<TUser> {
  isUserExistByEmail(email: string): Promise<TUser>;
  isUserExistById(id: string): Promise<TUser>;

  isPasswordMatched(
    // eslint-disable-next-line no-unused-vars
    plainTextPassword: string,
    // eslint-disable-next-line no-unused-vars
    hashPassword: string,
  ): Promise<boolean>;
}
