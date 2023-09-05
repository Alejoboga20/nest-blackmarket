import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

import { ProductState } from '../types/product';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  name: string;

  @Column('text')
  description: string;

  @Column('numeric')
  num_available_items: number;

  @Column('numeric')
  unit_price: number;

  @Column('text')
  state: ProductState;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
