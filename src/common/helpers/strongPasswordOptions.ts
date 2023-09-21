import { IsStrongPasswordOptions } from 'class-validator';

export const strongPasswordOptions: IsStrongPasswordOptions = {
  minLength: 8,
  minLowercase: 1,
  minNumbers: 1,
  minUppercase: 1,
};
