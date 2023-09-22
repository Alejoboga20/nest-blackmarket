import { HttpStatus, applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
} from '@nestjs/swagger';
import { LoginUserDto } from '../dto/login-user.dto';
import { User } from '@src/user/entities/user.entity';
import { CreateUserDto } from '@src/user/dto';

class AuthResponse {
  @ApiProperty()
  user: User;

  @ApiProperty()
  token: string;
}

type AuthMethods = 'register' | 'login';

export const AuthDescription = (methodName: AuthMethods) => {
  const label = methodName.charAt(0).toUpperCase() + methodName.slice(1);
  const body = methodName === 'register' ? CreateUserDto : LoginUserDto;

  return applyDecorators(
    ApiOperation({
      summary: label,
      description: `Endpoint to ${methodName} a user`,
    }),
    ApiBody({ type: body }),
    ApiOkResponse({
      description: `The user has been ${methodName} successfully`,
      type: AuthResponse,
      status: HttpStatus.OK,
    }),
  );
};
