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
import { strongPasswordOptions } from '@src/common/helpers/strongPasswordOptions';
import { userMessages } from '@src/common/constants/messages';

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
    message: userMessages.PASSWORD_VALIDATION_MESSAGE,
  })
  password: string;

  @Type(() => Date)
  @IsDate({
    message: userMessages.BIRTH_DATE_VALIDATION_MESSAGE,
  })
  birthDate: Date;

  @IsOptional()
  profilePicture: string;

  @IsOptional()
  @IsBoolean()
  notificationsEnabled: boolean;
}
