import { Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async register(createUserDto: CreateUserDto) {
    const user = await this.userRepository.createUser(createUserDto);

    return user;
  }
}
