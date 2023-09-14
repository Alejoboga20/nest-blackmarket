import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto';
import { ErrorCodes } from '@src/common/types/error';

const SALT_ROUNDS = 10;

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(createUserDto: CreateUserDto) {
    const { password, ...rest } = createUserDto;

    try {
      const user = this.create({
        ...rest,
        password: bcrypt.hashSync(password, SALT_ROUNDS),
      });

      await this.save(user);
      return { ...rest, id: user.id };
    } catch (error) {
      this.handleDbError(error);
    }
  }

  private handleDbError(error: any) {
    if (error.code === ErrorCodes.DUPLICATED_ENTITY) {
      throw new BadRequestException(error.detail);
    }

    throw new InternalServerErrorException();
  }
}
