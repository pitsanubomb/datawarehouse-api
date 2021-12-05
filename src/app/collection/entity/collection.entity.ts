import { ApiProperty } from '@nestjs/swagger';
import { DefaultEntity } from 'src/app/core/dbentity/default.entity';
import { ProductEntity } from 'src/app/product/entity/product.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('collection')
export class CollectionEntity extends DefaultEntity {
  @Column()
  collectionname: string;

  @ManyToOne(() => ProductEntity, (product) => product.collection)
  product: ProductEntity;
}
