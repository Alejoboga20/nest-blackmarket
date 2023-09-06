import { Column, Entity } from 'typeorm';

import { ProductState } from '../types/product';
import { BaseEntity } from 'src/common/entities/base.entity';

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

  @Column('text')
  state: ProductState;
}
