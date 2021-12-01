import { StockEntity } from './../../warehouse/entity/warehouse.entity';
import { DefaultEntity } from 'src/app/core/dbentity/default.entity';
import { ImagesEntity } from 'src/app/images/entity/images.entity';
import { VarientEntity } from 'src/app/varients/entity/varients.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity('sku')
export class SkuEntity extends DefaultEntity {
  @Column({ unique: true })
  sku: string;

  @Column()
  barcode: string;

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

  @OneToMany(() => StockEntity, (stock) => stock.sku, {
    cascade: true,
    eager: true,
  })
  warehousestock: StockEntity[];

  @ManyToMany(() => VarientEntity, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  varients: VarientEntity[];
}
