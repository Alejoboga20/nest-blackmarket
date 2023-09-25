import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

import { BaseEntity } from '@common/entities/base.entity';
import { Product } from '@product/entities/product.entity';

@Entity('categories')
export class Category extends BaseEntity {
  @Column({ type: 'text', unique: true })
  name: string;

  @Column({ type: 'text', default: null })
  description: string;

  @ManyToMany(() => Product, (product) => product.categories, {
    cascade: true,
  })
  @JoinTable({ name: 'categories_products' })
  products: Product[];
}
