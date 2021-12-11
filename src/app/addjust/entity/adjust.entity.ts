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
  @Column({ unique: true })
  refno: string;
  @Column()
  addjusttype: string;

  @OneToMany(
    () => AddjustDescriptionEntity,
    (addjusttdescriptions) => addjusttdescriptions.adjust,
    {
      cascade: true,
      eager: true,
    },
  )
  adjusedescriptions: AddjustDescriptionEntity[];

  @ManyToOne(() => warehouseEntity, (waehouse) => waehouse.addjusts, {
    cascade: true,
    eager: true,
  })
  warehouse: warehouseEntity;
}

@Entity('adjustmentdescription')
export class AddjustDescriptionEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'int', default: 0 })
  quantity: number;
  @ManyToOne(() => SkuEntity, (sku) => sku.addjusts)
  sku: SkuEntity;

  @ManyToOne(() => AdjustEntity, (adjust) => adjust.adjusedescriptions)
  adjust: AdjustEntity;
}
