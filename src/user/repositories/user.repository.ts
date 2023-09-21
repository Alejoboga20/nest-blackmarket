import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { ErrorCodes } from '@src/common/types/error';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(createUserDto: CreateUserDto) {
    try {
      const user = this.create({ ...createUserDto });
      await this.save(user);

      return user;
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
