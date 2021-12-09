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

  async getAllQuery() {
    try {
      return await this.productRepo
        .createQueryBuilder('product')
        .leftJoin('product.skus', 'skus')
        .leftJoinAndSelect('product.skus.warehousestock', 'stock')
        // .leftJoinAndSelect('product.images', 'images')
        .leftJoinAndSelect('product.vendor', 'vendors')
        // .leftJoinAndSelect('product.sku.stock', 'stock')
        // .loadRelationCountAndMap('product.varients', 'product.skus')
        .addSelect('SUM(skus.view)', 'view')
        .addSelect('COUNT(skus.id)', 'varients')
        // .addSelect('SUM(skus.warehousestock.quantity)','quantity')
        .groupBy('product.id')
        .getRawMany();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getPorductId(id: number) {
    try {
      return await this.productRepo.findOneOrFail(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getAllSingleSku() {
    try {
      return await this.productRepo
        .createQueryBuilder('product')
        .leftJoinAndSelect('product.skus', 'skus')
        .where('product.producttype = :type', { type: 'single' })
        .select('skus')
        .getRawMany();
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

  async getSkuById(id: number) {
    try {
      return await this.skuRepo.findOneOrFail(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getPorductIdbySkuid(id: number) {
    try {
      return await this.productRepo
        .createQueryBuilder('product')
        .leftJoin('product.skus', 'skus')
        .addSelect('product.id')
        .where('skus.id =:id', { id: id })
        .getOne();
    } catch (error) {
      console.error(error);
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

  async editProduct(id: number, product: any) {
    try {
      let edit = await this.productRepo.findOneOrFail(id);
      edit.productname = product.productname;
      // return edit
      // edit.productname = product.productname;
      // edit.skus = product.skus
      // return edit;
      // console.log(product)
      return await this.productRepo.save(product);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }
}
