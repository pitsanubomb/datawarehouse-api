import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Status } from '../enum/status.enum';

@Entity()
export class DefaultUserEntity {
  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  id: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'enum', enum: Status })
  status: string;

  @CreateDateColumn({ name: 'createdate' })
  createdate: Date;

  @UpdateDateColumn({ name: 'updateddate' })
  updateddate: Date;
}
