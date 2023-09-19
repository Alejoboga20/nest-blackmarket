import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserRepository } from './repositories/user.repository';
import { CreateUserDto } from './dto';

const SALT_ROUNDS = 10;

enum Messages {
  USER_NOT_FOUND = 'User not found',
}

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findOne(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    if (!user) throw new NotFoundException(Messages.USER_NOT_FOUND);

    return user;
  }

  async findOneById(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) throw new NotFoundException(Messages.USER_NOT_FOUND);

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
