import { DefaultEntity } from 'src/app/core/dbentity/default.entity';
import { ProductEntity } from 'src/app/product/entity/product.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('vendor')
export class VendorEntity extends DefaultEntity {
  @Column({ type: String })
  vendorname: string;

  @ManyToOne(() => ProductEntity, (product) => product.vendor)
  product: ProductEntity;
}
