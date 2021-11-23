import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entity/product.entity';
import { SkuEntity } from './entity/sku.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, SkuEntity], 'data')],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
