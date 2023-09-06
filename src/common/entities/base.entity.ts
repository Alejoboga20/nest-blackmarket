import { CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
}
