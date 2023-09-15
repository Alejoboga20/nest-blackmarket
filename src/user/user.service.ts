import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserRepository } from './repositories/user.repository';
import { CreateUserDto } from './dto';

const SALT_ROUNDS = 10;

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findOne(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const { password, ...restUserDto } = createUserDto;
    const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS);

    const user = await this.userRepository.createUser({
      ...restUserDto,
      password: hashedPassword,
    });

    return user;
  }
}
