import { BaseEntity } from '@common/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('categories')
export class Category extends BaseEntity {
  @Column({ type: 'text', unique: true })
  name: string;

  @Column({ type: 'text', default: null })
  description: string;
}
