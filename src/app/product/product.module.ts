import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageModule } from '../images/images.modulet';
import { VarientEntity } from '../varients/entity/varients.entity';
import { BundleEntity, ProductEntity } from './entity/product.entity';
import { SkuEntity } from './entity/sku.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [BundleEntity, ProductEntity, SkuEntity, VarientEntity],
      'data',
    ),
    ImageModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
