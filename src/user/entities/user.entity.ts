import { BeforeInsert, Column, Entity } from 'typeorm';
import { Exclude } from 'class-transformer';

import { BaseEntity } from '@common/entities/base.entity';
import { UserRoles } from '../enums/user-roles.enum';

@Entity('users')
export class User extends BaseEntity {
  @Column({ unique: true, type: 'text' })
  email: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({ type: 'text' })
  nickname: string;

  @Column({ type: 'text', name: 'profile_picture', default: '' })
  profilePicture: string;

  @Column({ type: 'date', name: 'birth_date' })
  birthDate: Date;

  @Column({ type: 'text', name: 'notifications_enabled', default: false })
  notificationsEnabled: boolean;

  @Column({
    type: 'enum',
    enum: UserRoles,
    array: true,
    default: [UserRoles.USER],
  })
  roles: UserRoles[];

  @BeforeInsert()
  createNickname() {
    this.nickname = this.email.split('@')[0];
  }
}
