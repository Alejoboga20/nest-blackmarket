import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import { User } from '@user/entities/user.entity';
import { META_ROLES } from '@user/decorators/user-valid-roles.decorator';

@Injectable()
export class UserRole implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validroles = this.reflector.get<string[]>(
      META_ROLES,
      context.getHandler(),
    );

    if (!validroles) return true;

    const request = context.switchToHttp().getRequest();
    const user: User = request.user;

    for (const role of user.roles) {
      if (validroles.includes(role)) return true;
    }

    throw new UnauthorizedException('Unauthorized');
  }
}
