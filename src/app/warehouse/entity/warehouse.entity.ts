import { DefaultEntity } from 'src/app/core/dbentity/default.entity';
import { SkuEntity } from 'src/app/product/entity/sku.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity('warehouse')
export class warehouseEntity extends DefaultEntity {
  @Column()
  warehousename: string;
  @Column({ nullable: true, type: 'float' })
  lattitude: number;
  @Column({ nullable: true, type: 'float' })
  longitude: number;
  @Column({ nullable: true })
  adress: string;
  @Column({ nullable: true })
  email: string;
  @Column({ nullable: true })
  tel: string;
  @Column({ nullable: true })
  description: string;
  @Column({ nullable: true })
  contact: string;
  @Column({ default: false })
  isreturn: boolean;
  @OneToMany((type) => StockEntity, (stock) => stock.warehouse)
  stocks: StockEntity[];
}

@Entity('stock')
export class StockEntity extends DefaultEntity {
  @Column({ type: 'int', default: 0 })
  quantity: number;
  @ManyToOne((type) => SkuEntity, (sku) => sku.warehousestock)
  sku: SkuEntity;

  @ManyToOne((type) => warehouseEntity, (warhouse) => warhouse.stocks)
  warehouse: warehouseEntity;
}
