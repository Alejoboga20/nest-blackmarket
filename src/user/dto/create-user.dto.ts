import { strongPasswordOptions } from '@src/common/helpers/strongPasswordOptions';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

enum Messages {
  PASSWORD_VALIDATION_MESSAGE = 'The password must have an Uppercase, a lowercase letter and a number',
  BIRTH_DATE_VALIDATION_MESSAGE = 'Birth date must be a valid date with the format YYYY-MM-DD',
}

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @MinLength(3)
  @IsOptional()
  nickname: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @IsStrongPassword(strongPasswordOptions, {
    message: Messages.PASSWORD_VALIDATION_MESSAGE,
  })
  password: string;

  @Type(() => Date)
  @IsDate({
    message: Messages.BIRTH_DATE_VALIDATION_MESSAGE,
  })
  birthDate: Date;

  @IsOptional()
  profilePicture: string;

  @IsOptional()
  @IsBoolean()
  notificationsEnabled: boolean;
}
