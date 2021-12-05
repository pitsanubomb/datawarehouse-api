import { DefaultEntity } from 'src/app/core/dbentity/default.entity';
import { ProductEntity } from 'src/app/product/entity/product.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('supplier')
export class SupplierEntity extends DefaultEntity {
  @Column()
  suppliername: string;

  @ManyToOne(() => ProductEntity, (product) => product.supplier)
  product: ProductEntity;
}
