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

  @Column('numeric', { name: 'num_available_items' })
  numAvailableItems: number;

  @Column('numeric', { name: 'unit_price' })
  unitPrice: number;

  @Column('text')
  state: ProductState;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
}
