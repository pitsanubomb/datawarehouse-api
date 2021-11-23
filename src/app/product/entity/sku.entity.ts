import { DefaultEntity } from 'src/app/core/dbentity/default.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity('sku')
export class SkuEntity extends DefaultEntity {
  @Column()
  sku: string;
  
  @Column()
  barcode: string;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'float' })
  cost: number;

  @Column({ type: 'float' })
  margin: number;

  @ManyToOne(() => ProductEntity, (product) => product.skus)
  product: ProductEntity;
}
