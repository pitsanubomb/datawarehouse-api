import { Adjusttype } from 'src/app/core/enum/adjusttype.enum';
import { SkuEntity } from 'src/app/product/entity/sku.entity';
import { warehouseEntity } from 'src/app/warehouse/entity/warehouse.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DefaultEntity } from './../../core/dbentity/default.entity';
@Entity('adjustment')
export class AdjustEntity extends DefaultEntity {
  @Column({ unique: true, nullable: true })
  refno: string;

  @Column({ nullable: true, type: 'enum', enum: Adjusttype })
  addjusttype: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(
    () => AddjustDescriptionEntity,
    (addjusttdescriptions) => addjusttdescriptions.adjust,
    {
      cascade: true,
      eager: true,
    },
  )
  addjustdescriptions: AddjustDescriptionEntity[];

  @ManyToOne(() => warehouseEntity, (warehouse) => warehouse.addjusts, {
    cascade: true,
    eager: true,
  })
  warehouse: warehouseEntity;

  @Column({ default: 'MockAdmin' })
  createby: string;

  @Column({ nullable: true })
  approveby: string;
}

@Entity('adjustmentdescription')
export class AddjustDescriptionEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'int', default: 0 })
  quantity: number;
  @ManyToOne(() => SkuEntity, (sku) => sku.addjusts)
  sku: SkuEntity;

  @Column({ type: 'enum', enum: Adjusttype })
  addjusttype: string;

  @ManyToOne(() => AdjustEntity, (adjust) => adjust.addjustdescriptions)
  adjust: AdjustEntity;
}
