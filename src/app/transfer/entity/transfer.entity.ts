import { warehouseEntity } from './../../warehouse/entity/warehouse.entity';
import { DefaultEntity } from 'src/app/core/dbentity/default.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SkuEntity } from 'src/app/product/entity/sku.entity';

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
  @JoinTable({ name: 'for' })
  form: warehouseEntity[];

  @ManyToMany(() => warehouseEntity, {
    cascade: true,
    eager: true,
  })
  @JoinTable({ name: 'to' })
  to: warehouseEntity[];

  @Column({ type: 'float', nullable: true })
  cost: number;

  @Column()
  orderby: string;

  @Column({ nullable: true })
  approveby: string;

  @CreateDateColumn({ name: 'orderdate' })
  orderdate: Date;

  @UpdateDateColumn({ nullable: true, name: 'approvedate' })
  approvedate: Date;

  @Column({ nullable: true })
  shippingdate: Date;

  @OneToMany(
    () => TransferDescriptionEntity,
    (transfer_description) => transfer_description.transfer,
    {
      cascade: true,
      eager: true,
    },
  )
  transfer_description: TransferDescriptionEntity[];
}

@Entity('transfer_description')
export class TransferDescriptionEntity extends DefaultEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'int', default: 0 })
  quantity: number;
  @ManyToOne(() => SkuEntity, (sku) => sku.transfer)
  sku: SkuEntity;

  @ManyToOne(() => TransferEntity, (transfer) => transfer.transfer_description)
  transfer: TransferEntity;
}
