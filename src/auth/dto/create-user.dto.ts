import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

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
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have an Uppercase, a lowercase letter and a number',
  })
  password: string;

  @Type(() => Date)
  @IsDate({
    message: 'Birth date must be a valid date with the format YYYY-MM-DD',
  })
  birthDate: Date;

  @IsOptional()
  profilePicture: string;

  @IsOptional()
  @IsBoolean()
  notificationsEnabled: boolean;
}
