import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VarientEntity } from '../varients/entity/varients.entity';
import { createProduct, CreateSkuDto, ProductDto } from './dto/product.dto';
import { ProductEntity } from './entity/product.entity';
import { SkuEntity } from './entity/sku.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity, 'data')
    private readonly productRepo: Repository<ProductEntity>,
    @InjectRepository(SkuEntity, 'data')
    private readonly skuRepo: Repository<SkuEntity>,
    @InjectRepository(VarientEntity, 'data')
    private readonly varientRepo: Repository<VarientEntity>,
  ) {}

  async crateProduct(productBody: createProduct) {
    try {
      return await this.productRepo.save(productBody);
    } catch (error) {
      console.error(error)
      throw new InternalServerErrorException();
    }
  }

  async getAll() {
    try {
      return await this.productRepo.find();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getAllwithCount() {
    try {
      const [res, count] = await this.productRepo.findAndCount();
      return { data: res, total: count };
    } catch (error) {}
  }
}
