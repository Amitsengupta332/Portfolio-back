import { model, Schema } from 'mongoose';
import { TUser, UserModel } from './auth.interface';
import AppError from '../../errors/appError';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<TUser, UserModel>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

// Validation for duplicate user name
userSchema.pre('save', async function (next) {
  const isUsernameExist = await User.findOne({
    username: this.username,
  });
  if (isUsernameExist) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This user name is already exist',
    );
  }
  next();
});

// Validation for duplicate email
userSchema.pre('save', async function (next) {
  const isEmailExist = await User.findOne({
    email: this.email,
  });
  if (isEmailExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This email is already exist');
  }
  next();
});

// We will use it to hash our password
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  // Hashing password and save into db
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

// // reuseable static method for ckecking user exist by username
// userSchema.statics.isUserExistByUserName = async function (username: string) {
//   return await User.findOne({ username: username }).select('+password');
// };

// reuseable static method for checking user exist by email
userSchema.statics.isUserExistByEmail = async function (email: string) {
  return await User.findOne({ email: email })
    .select('+password')
    .select('+role');
};

// reuseable static method for ckecking user exist by _id
userSchema.statics.isUserExistById = async function (id: string) {
  return await User.findOne({ _id: id }).select('+password');
};

// reuseable static method for cheking if the password is matched
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashPassword);
};

export const User = model<TUser, UserModel>('User', userSchema);
