import { CategoryEntity } from 'src/app/category/entity/category.entity';
import { CollectionEntity } from 'src/app/collection/entity/collection.entity';
import { DefaultEntity } from 'src/app/core/dbentity/default.entity';
import { ImagesEntity } from 'src/app/images/entity/images.entity';
import { SupplierEntity } from 'src/app/supplier/entity/entity';
import { VendorEntity } from 'src/app/vendor/entity/vendor.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
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

  @Column({ nullable: true })
  isContinuesell: boolean;

  @Column({ default: false, type: 'boolean' })
  isMultipleoptions: boolean;

  @Column({ nullable: true })
  isPos: boolean;

  @Column({ nullable: true })
  isOnline: boolean;

  @Column({ default: false })
  isArchived: boolean;

  @OneToMany(() => SkuEntity, (sku) => sku.product, {
    cascade: true,
    eager: true,
  })
  skus: SkuEntity[];

  @OneToMany((type) => BundleEntity, (bundle) => bundle.product, {
    cascade: true,
    eager: true,
  })
  bundle: BundleEntity[];

  @OneToMany(() => ImagesEntity, (images) => images.product, {
    cascade: true,
    eager: true,
  })
  images: ImagesEntity[];

  @ManyToOne(() => VendorEntity, (vendor) => vendor.product, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  vendor: VendorEntity[];

  @ManyToOne(() => SupplierEntity, (supplier) => supplier.product, {
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

  @ManyToOne(() => CollectionEntity,(collection) => collection.product, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  collection: CollectionEntity[];
}

@Entity('bundle')
export class BundleEntity extends DefaultEntity {
  @Column({ type: 'int', default: 0 })
  quantity: number;

  @ManyToOne((type) => SkuEntity, (sku) => sku.bundle, {
    // primary: true,
  })
  sku: SkuEntity;

  @ManyToOne((type) => ProductEntity, (product) => product.bundle, {
    // primary: true,
  })
  product: ProductEntity;
}
