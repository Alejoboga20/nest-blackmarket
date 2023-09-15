import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserService } from '@src/user/user.service';
import { CreateUserDto } from '@src/user/dto/create-user.dto';
import { LoginUserDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);

    return { ...user, token: this.generateJwtToken(user.id) };
  }

  async login(loginDto: LoginUserDto) {
    const { email, password } = loginDto;
    const user = await this.userService.findOne(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!this.isValidPassword(password, user.password))
      throw new UnauthorizedException('Invalid credentials');

    delete user.password;

    return { ...user, token: this.generateJwtToken(user.id) };
  }

  private generateJwtToken(id: string) {
    return this.jwtService.sign({ id });
  }

  private isValidPassword(password: string, hashedPassword: string) {
    return bcrypt.compareSync(password, hashedPassword);
  }
}
