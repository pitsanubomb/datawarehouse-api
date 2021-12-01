import { DefaultEntity } from 'src/app/core/dbentity/default.entity';
import { SkuEntity } from 'src/app/product/entity/sku.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity('warehouse')
export class warehouseEntity extends DefaultEntity {
  @Column()
  warehousename: string;
  @Column({ nullable: true })
  description: string;

  @OneToMany((type) => StockEntity, (stock) => stock.warehouse)
  stocks: StockEntity[];
}

@Entity('stock')
export class StockEntity extends DefaultEntity {
  @Column({ type: 'int', default: 0 })
  quantity: number;
  @ManyToOne((type) => SkuEntity, (sku) => sku.warehousestock, {
    primary: true,
  })
  sku: SkuEntity;

  @ManyToOne((type) => warehouseEntity, (warhouse) => warhouse.stocks, {
    primary: true,
  })
  warehouse: warehouseEntity;
}
