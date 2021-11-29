import { ImageModule } from './images/images.modulet';
import { VarientEntity } from './varients/entity/varients.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ProductEntity } from './product/entity/product.entity';
import { SkuEntity } from './product/entity/sku.entity';
import { ProductModule } from './product/product.module';
import { UserEntity } from './user/entity/user.entity';
import { UserModule } from './user/user.module';
import { AttributeEntity } from './varients/entity/attribute.entity';
import { VarientModule } from './varients/varients.module';
import { ImagesEntity } from './images/entity/images.entity';
import { VendorEntity } from './vendor/entity/vendor.entity';
import { VendorModule } from './vendor/vendor.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '104.199.136.115',
      name: 'data',
      // debug: true,
      port: 3306,
      username: 'root',
      password: 'p@ssword',
      database: 'datawarehouse-data-dev',
      entities: [
        ProductEntity,
        SkuEntity,
        AttributeEntity,
        VarientEntity,
        VendorEntity,
        ImagesEntity,
      ],
      synchronize: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      name: 'user',
      host: '104.199.136.115',
      port: 3306,
      // debug:true,
      username: 'root',
      password: 'p@ssword',
      database: 'datawarehouse-dev',
      entities: [UserEntity],
      synchronize: true,
    }),
    AuthModule,
    VarientModule,
    UserModule,
    ProductModule,
    ImageModule,
    VendorModule,
  ],
})
export class AppModule {}
