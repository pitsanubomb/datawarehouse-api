import { TransferDescriptionEntity, TransferEntity } from './transfer/entity/transfer.entity';
import { WarehouseModule } from './warehouse/warehouse.module';
import {
  StockEntity,
  warehouseEntity,
} from './warehouse/entity/warehouse.entity';
import { SupplierEntity } from './supplier/entity/entity';
import { ImageModule } from './images/images.modulet';
import { VarientEntity } from './varients/entity/varients.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { BundleEntity, ProductEntity } from './product/entity/product.entity';
import { SkuEntity } from './product/entity/sku.entity';
import { ProductModule } from './product/product.module';
import { UserEntity } from './user/entity/user.entity';
import { UserModule } from './user/user.module';
import { AttributeEntity } from './varients/entity/attribute.entity';
import { VarientModule } from './varients/varients.module';
import { ImagesEntity } from './images/entity/images.entity';
import { VendorEntity } from './vendor/entity/vendor.entity';
import { VendorModule } from './vendor/vendor.module';
import { SupplierModule } from './supplier/supplier.module';
import { CategoryEntity } from './category/entity/category.entity';
import { CategoryModule } from './category/category.module';
import { CollectionModule } from './collection/collection.module';
import { CollectionEntity } from './collection/entity/collection.entity';
import { TransferModule } from './transfer/transfer.module';
import { UploadModule } from './upload/upload.module';
import {
  AddjustDescriptionEntity,
  AdjustEntity,
} from './addjust/entity/adjust.entity';
import { AddjustModule } from './addjust/adjust.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'datawarehouse.giize.com',
      // host: 'localhost',
      name: 'data',
      // debug: true,
      port: 3306,
      username: 'root',
      password: 'p@ssword',
      database: 'data-local',
      entities: [
        BundleEntity,
        ProductEntity,
        SkuEntity,
        AttributeEntity,
        VarientEntity,
        VendorEntity,
        ImagesEntity,
        SupplierEntity,
        CategoryEntity,
        CollectionEntity,
        warehouseEntity,
        StockEntity,
        TransferEntity,
        AdjustEntity,
        AddjustDescriptionEntity,
        TransferDescriptionEntity,
      ],
      synchronize: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      name: 'user',
      host: 'datawarehouse.giize.com',
      port: 3306,
      // debug:true,
      username: 'root',
      password: 'p@ssword',
      database: 'datawarehouse-dev',
      entities: [UserEntity],
      synchronize: true,
    }),
    AddjustModule,
    AuthModule,
    VarientModule,
    UserModule,
    ProductModule,
    ImageModule,
    VendorModule,
    SupplierModule,
    CategoryModule,
    CollectionModule,
    WarehouseModule,
    TransferModule,
    UploadModule,
  ],
})
export class AppModule {}
