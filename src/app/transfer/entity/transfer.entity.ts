import { warehouseEntity } from './../../warehouse/entity/warehouse.entity';
import { DefaultEntity } from 'src/app/core/dbentity/default.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
} from 'typeorm';

@Entity('transfer')
export class TransferEntity extends DefaultEntity {
  @Column()
  ref: string;

  @Column({ nullable: true })
  shippingno: string;

  @ManyToMany(() => warehouseEntity, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  form: warehouseEntity[];

  @ManyToMany(() => warehouseEntity, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  to: warehouseEntity[];

  @Column({ type: 'float', nullable: true })
  cost: number;

  @Column()
  orderby: string;


  @Column({ nullable: true })
  approveby: string;

  @CreateDateColumn({ name: 'orderdate' })
  orderdate: Date;

  @Column({ nullable: true })
  approvedate: Date;

  @Column({ nullable: true })
  shippingdate: Date;
}
