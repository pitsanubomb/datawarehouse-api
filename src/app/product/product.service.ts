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
      throw new InternalServerErrorException(error);
    }
  }

  async getAll() {
    try {
      // return await this.productRepo
      //   .createQueryBuilder('product')
      //   .leftJoinAndSelect('product.skus', 'skus')
      //   .leftJoinAndSelect('product.images', 'images')
      //   .leftJoinAndSelect('product.vendor', 'vendors')
      //   // .leftJoinAndSelect('product.stock', 'stock')
      //   .loadRelationCountAndMap('product.varients', 'product.skus')
      //   .getMany();
      return await this.productRepo.find();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getAllSku() {
    try {
      return await this.skuRepo.find();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getSkuBysku(sku: string) {
    try {
      return await this.skuRepo.findOne({ where: { sku: sku } });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getAllwithCount() {
    try {
      const [res, count] = await this.productRepo.findAndCount();
      return { data: res, total: count };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
