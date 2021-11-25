import { DefaultEntity } from 'src/app/core/dbentity/default.entity';
import { ProductEntity } from 'src/app/product/entity/product.entity';
import { SkuEntity } from 'src/app/product/entity/sku.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('images')
export class ImagesEntity extends DefaultEntity {
  @Column()
  imagepath: string;

  @Column({ nullable: true })
  imagetype: string;

  @ManyToOne(() => ProductEntity, (product) => product.images)
  product: ProductEntity;

  @ManyToOne(() => SkuEntity, (sku) => sku.images)
  sku: ProductEntity;
}
