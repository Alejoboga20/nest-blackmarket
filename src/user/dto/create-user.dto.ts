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
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'test@email.com',
    title: 'User Email',
    description: 'Email of the user',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'John Doe',
    title: 'User Name',
    description: 'Name of the user',
    required: true,
  })
  @IsString()
  @MinLength(3)
  name: string;

  @ApiPropertyOptional({
    example: 'John Doe',
    title: 'User Nickname',
    description: 'Nickname of the user',
  })
  @IsString()
  @MinLength(3)
  @IsOptional()
  nickname?: string;

  @ApiProperty({
    example: 'ThisIsStrong123!',
    title: 'User Password',
    description: 'Password of the user',
    required: true,
  })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @IsStrongPassword(strongPasswordOptions, {
    message: userMessages.PASSWORD_VALIDATION_MESSAGE,
  })
  password: string;

  @ApiProperty({
    example: '1995-08-10',
    title: 'User Datebirth',
    description: 'Datebirth of the user',
    required: true,
  })
  @Type(() => Date)
  @IsDate({
    message: userMessages.BIRTH_DATE_VALIDATION_MESSAGE,
  })
  birthDate: Date;

  @ApiPropertyOptional({
    example: 'this_is_my_picture.png',
    title: 'User Profile Picture',
    description: 'Profile picture of the user',
  })
  @IsOptional()
  profilePicture?: string;

  @ApiPropertyOptional({
    example: true,
    title: 'User Notifications Enabled',
    description: 'Notifications enabled',
  })
  @IsOptional()
  @IsBoolean()
  notificationsEnabled?: boolean;
}
