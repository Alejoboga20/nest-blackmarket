import { HttpStatus, applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
} from '@nestjs/swagger';
import { LoginUserDto } from '../dto/login-user.dto';
import { User } from '@src/user/entities/user.entity';

class AuthResponse {
  @ApiProperty()
  user: User;

  @ApiProperty()
  token: string;
}

export const AuthDescription = (methodName: string) => {
  const label = methodName.charAt(0).toUpperCase() + methodName.slice(1);

  return applyDecorators(
    ApiOperation({
      summary: label,
      description: `Endpoint to ${methodName} a user`,
    }),
    ApiBody({ type: LoginUserDto }),
    ApiOkResponse({
      description: `The user has been ${methodName} successfully`,
      type: AuthResponse,
      status: HttpStatus.OK,
    }),
  );
};
