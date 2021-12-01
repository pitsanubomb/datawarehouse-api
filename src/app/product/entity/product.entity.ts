import { CategoryEntity } from 'src/app/category/entity/category.entity';
import { CollectionEntity } from 'src/app/collection/entity/collection.entity';
import { DefaultEntity } from 'src/app/core/dbentity/default.entity';
import { ImagesEntity } from 'src/app/images/entity/images.entity';
import { SupplierEntity } from 'src/app/supplier/entity/entity';
import { VendorEntity } from 'src/app/vendor/entity/vendor.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { SkuEntity } from './sku.entity';

export enum ProductType {
  SINGLE = 'single',
  BUNDLE = 'bundle',
  SERVICE = 'service',
}

@Entity('product')
export class ProductEntity extends DefaultEntity {
  @Column()
  productname: string;

  @Column({ type: 'enum', enum: ProductType, default: ProductType.SINGLE })
  producttype: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'varchar', nullable: true })
  countryorigin: string;

  @Column({nullable: true})
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

  @ManyToMany(() => VendorEntity, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  vendor: VendorEntity[];

  @ManyToMany(() => SupplierEntity, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  supplier: SupplierEntity[];

  @ManyToMany(() => CategoryEntity, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  category: CategoryEntity[];

  @ManyToMany(() => CollectionEntity, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  collection: CollectionEntity[];
}
