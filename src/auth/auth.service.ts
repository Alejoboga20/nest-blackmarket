import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { authMessages } from '@common/constants/messages';
import { UserService } from '@user/user.service';
import { CreateUserDto } from '@user/dto/create-user.dto';
import { LoginUserDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);

    return { user, token: this.generateJwtToken(user.id) };
  }

  async login(loginDto: LoginUserDto) {
    const { email, password } = loginDto;
    const user = await this.userService.findOne(email);

    if (!user) {
      throw new UnauthorizedException(authMessages.INVALID_CREDENTIALS);
    }

    if (!this.isValidPassword(password, user.password))
      throw new UnauthorizedException(authMessages.INVALID_CREDENTIALS);

    return { user, token: this.generateJwtToken(user.id) };
  }

  private generateJwtToken(id: string) {
    return this.jwtService.sign({ id });
  }

  private isValidPassword(password: string, hashedPassword: string) {
    return bcrypt.compareSync(password, hashedPassword);
  }
}
