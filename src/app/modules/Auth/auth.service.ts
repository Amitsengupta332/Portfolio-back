import httpStatus from 'http-status';
import AppError from '../../errors/appError';
import { TLoginUser, TUser } from './auth.interface';
import { User } from './auth.model';
import config from '../../config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const createUser = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const loginUser = async (payload: TLoginUser) => {
  // Check if the user is exist
  const user = await User.isUserExistByEmail(payload?.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found');
  }

  // Check if the password is matched
  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');
  }

  // Access is granted ==> Create access token and Send to the user

  // Create jwt payload
  const jwtPayload = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    id: (user as any)._id,
    email: user.email,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '10d',
  });

  // Exclude the password field from the result object
  const modifiedResult = JSON.parse(JSON.stringify(user));
  delete modifiedResult.password;

  return {
    user: modifiedResult,
    token: accessToken,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: {
    currentPassword: string;
    newPassword: string;
  },
) => {
  // Check if the user is exist
  const user = await User.isUserExistById(userData?.id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found');
  }

  // Check if the password is matched
  if (
    !(await User.isPasswordMatched(payload?.currentPassword, user?.password))
  ) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');
  }

  // hash new password
  const newHashedPassword = await bcrypt.hash(
    payload?.newPassword,
    Number(config.bcrypt_salt_round),
  );

  // Update password and passwordChangeHistory
  await User.findOneAndUpdate(
    {
      _id: userData.id,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      passwordChangeAt: new Date(),
      $push: {
        passwordChangeHistory: {
          $each: [{ password: user?.password, time: new Date() }],
          $position: 0,
          $slice: 2,
        },
      },
    },
    { new: true },
  );

  return user;
};

export const authService = {
  createUser,
  loginUser,
  changePassword,
};
