import { Column, Entity, ManyToMany } from 'typeorm';

import { ProductState } from '../types/product';
import { BaseEntity } from '../../common/entities/base.entity';
import { Category } from '@category/entities/category.entity';

@Entity('products')
export class Product extends BaseEntity {
  @Column('text', { unique: true })
  name: string;

  @Column('text')
  description: string;

  @Column('numeric', { name: 'num_available_items' })
  numAvailableItems: number;

  @Column('numeric', { name: 'unit_price' })
  unitPrice: number;

  @Column({ type: 'enum', enum: ProductState })
  state: ProductState;

  @ManyToMany(() => Category, (category) => category.products, {
    eager: true,
  })
  categories: Category[];
}
