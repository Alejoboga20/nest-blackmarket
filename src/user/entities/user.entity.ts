import { BeforeInsert, Column, Entity } from 'typeorm';

import { BaseEntity } from '@src/common/entities/base.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ unique: true, type: 'text' })
  email: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'text' })
  nickname: string;

  @Column({ type: 'text', name: 'profile_picture', default: '' })
  profilePicture: string;

  @Column({ type: 'date', name: 'birth_date' })
  birthDate: Date;

  @Column({ type: 'text', name: 'notifications_enabled', default: false })
  notificationsEnabled: boolean;

  @BeforeInsert()
  createNickname() {
    this.nickname = this.email.split('@')[0];
  }
}
