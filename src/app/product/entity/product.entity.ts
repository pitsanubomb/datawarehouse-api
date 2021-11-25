import { DefaultEntity } from 'src/app/core/dbentity/default.entity';
import { ImagesEntity } from 'src/app/images/entity/images.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { SkuEntity } from './sku.entity';

export enum ProductType {
  SINGLE = 'single',
  BUNDLE = 'bundle',
  SERVICE = 'service',
}

@Entity('product')
export class ProductEntity extends DefaultEntity {
  // @Column({ unique: true })
  productname: string;

  @Column({ type: 'enum', enum: ProductType, default: ProductType.SINGLE })
  producttype: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'varchar',nullable: true})
  countryorigin: string;

  @Column()
  isContinuesell: boolean;

  @Column({ default: false, type: 'boolean' })
  isMultipleoptions: boolean;

  @Column()
  isPos: boolean;

  @Column()
  isOnline: boolean;

  @Column({ default: false })
  isArchived: boolean;

  @OneToMany(() => SkuEntity, (sku) => sku.product, {
    cascade: true,
    eager: true,
  })
  skus: SkuEntity[];

  @OneToMany(() => ImagesEntity, (images) => images.product, {
    cascade: true,
    eager: true,
  })
  images: ImagesEntity[];
}
