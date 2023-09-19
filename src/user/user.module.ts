import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';

@Module({
  controllers: [],
  providers: [UserService, UserRepository],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UserService, TypeOrmModule],
})
export class UserModule {}
