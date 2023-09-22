import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    example: 'test@email.com',
    title: 'User Email',
    description: 'Email of the user',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'ThisIsStrong123!',
    title: 'User Password',
    description: 'Password of the user',
    required: true,
  })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  password: string;
}
