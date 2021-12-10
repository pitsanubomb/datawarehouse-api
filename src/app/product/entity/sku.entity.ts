import {
  AddjustDescriptionEntity,
  AdjustEntity,
} from 'src/app/addjust/entity/adjust.entity';
import { StockEntity } from './../../warehouse/entity/warehouse.entity';
import { DefaultEntity } from 'src/app/core/dbentity/default.entity';
import { ImagesEntity } from 'src/app/images/entity/images.entity';
import { VarientEntity } from 'src/app/varients/entity/varients.entity';
import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BundleEntity, ProductEntity } from './product.entity';
import { AttributeEntity } from 'src/app/varients/entity/attribute.entity';

@Entity('sku')
export class SkuEntity extends DefaultEntity {
  // @Index({ unique: true, where: "sku IS NOT NULL" })
  @Column({ unique: true, nullable: true })
  sku!: string;

  // @Index({ unique: true, where: "barcode IS NOT NULL" })
  @Column({ unique: true, nullable: true })
  barcode!: string;

  @Column({ nullable: true })
  skuname: string;

  @Column({ type: 'float', nullable: true })
  compareprice: number;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'float' })
  cost: number;

  @Column({ type: 'float' })
  margin: number;

  @Column({ type: 'float', nullable: true })
  weight: number;

  @Column({ type: 'float', nullable: true })
  height: number;

  @Column({ type: 'float', nullable: true })
  width: number;

  @Column({ type: 'float', nullable: true })
  long: number;

  @Column({ type: 'int', default: 0 })
  view: number;

  @ManyToOne(() => ProductEntity, (product) => product.skus)
  product: ProductEntity;

  @OneToMany(() => ImagesEntity, (images) => images.sku, {
    cascade: true,
    eager: true,
  })
  images: ImagesEntity[];

  @OneToMany(() => AddjustDescriptionEntity, (addjusts) => addjusts.sku, {
    cascade: true,
    eager: true,
  })
  addjusts: AddjustDescriptionEntity[];

  @OneToMany(() => StockEntity, (stock) => stock.sku, {
    cascade: true,
    eager: true,
  })
  warehousestock: StockEntity[];

  @OneToMany(() => BundleEntity, (bundle) => bundle.sku)
  bundle: BundleEntity[];

  @ManyToMany(() => VarientEntity, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  varients: VarientEntity[];
}
