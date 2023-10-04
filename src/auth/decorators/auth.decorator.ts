import { UseGuards, applyDecorators } from '@nestjs/common';

import { UserValidRoles } from '@user/decorators/user-valid-roles.decorator';
import { UserRoles } from '@user/enums/user-roles.enum';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UserRole } from '../guards/user-role.guard';

export const Auth = (...roles: UserRoles[]) => {
  return applyDecorators(
    UserValidRoles(...roles),
    UseGuards(JwtAuthGuard, UserRole),
  );
};
