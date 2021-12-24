import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createProduct } from './dto/product.dto';
import { ProductEntity } from './entity/product.entity';
import { SkuEntity } from './entity/sku.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity, 'data')
    private readonly productRepo: Repository<ProductEntity>,
    @InjectRepository(SkuEntity, 'data')
    private readonly skuRepo: Repository<SkuEntity>,
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
      return await this.productRepo.find();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async queryTable(skip: number, take: number) {
    try {
      const data = await this.productRepo.query(`SELECT
    MIN(img.imagepath) img,
     product.id,
     product.productname,
     product.producttype,
     product.status,
     product.producttype,
     product.createdate addon,
     product.isMultipleoptions,
     COUNT(DISTINCT sku.id) Variant,
     IFNULL(FORMAT(SUM(stock.quantity) / COUNT(DISTINCT stock.id),0), 0) quantity,
     vendor.vendorname,
     IFNULL(SUM(sku.view), 0) view,
     IFNULL(product.isOnline, 0) online
   FROM
     sku
     RIGHT JOIN product ON product.id = sku.productId
     LEFT JOIN stock ON stock.skuId = sku.id
     LEFT JOIN vendor ON vendor.id = product.vendorId
     LEFT JOIN images img ON img.productId = product.id
   GROUP BY
     product.id
    LIMIT ${skip},
    ${take}`);
      const total = await this.productRepo.count();

      return { data: data, total: total };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getProductId(id: number) {
    try {
      return await this.productRepo.findOneOrFail(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getAllSkuWithSearch(search: string) {
    // Debug hear
    // console.debug(`Search is . . . ${search}`);
    try {
      return await this.productRepo.query(`
      SELECT
	    sku.id,
	    sku.sku,
	    sku.barcode,
	    sku.skuname,
	    CONCAT(sku.skuname, ' ', IFNULL(GROUP_CONCAT(varient.varientname SEPARATOR '/'), '')) productname
      FROM
	    sku
	    LEFT JOIN product ON product.id = sku.productId
	    LEFT JOIN sku_varients_varient ON sku_varients_varient.skuId = sku.id
	    LEFT JOIN varient ON varient.id = sku_varients_varient.varientId
      WHERE
	    product.producttype = 'single' and productname LIKE '%${search}%'
      GROUP BY
	    sku.id
      `);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getAllSkuInWarehouseWithSearch(search: string, w: number) {
    // Debug hear
    // console.debug(`Search is . . . ${search}`);
    try {
      return await this.productRepo.query(`
      SELECT
	    sku.id,
	    sku.sku,
	    sku.barcode,
	    sku.skuname,
	    CONCAT(sku.skuname, ' ', IFNULL(GROUP_CONCAT(DISTINCT varient.varientname SEPARATOR '/'), '')) productname
      FROM
	    sku
	    LEFT JOIN product ON product.id = sku.productId
	    LEFT JOIN sku_varients_varient ON sku_varients_varient.skuId = sku.id
	    LEFT JOIN varient ON varient.id = sku_varients_varient.varientId
      LEFT JOIN stock ON stock.skuId = sku.id
      LEFT JOIN warehouse w ON stock.warehouseId = w.id
      WHERE
	    product.producttype = 'single' and productname LIKE '%${search}%' and w.id = '${w}'
      GROUP BY
	    sku.id
      `);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getAllSkuwithStatus(productType: string) {
    try {
      return await this.productRepo.query(`
      SELECT
	    sku.id,
	    sku.sku,
	    sku.barcode,
	    sku.skuname,
	    CONCAT(sku.skuname, ' ', IFNULL(GROUP_CONCAT(varient.varientname SEPARATOR '/'), '')) productname
      FROM
	    sku
	    LEFT JOIN product ON product.id = sku.productId
	    LEFT JOIN sku_varients_varient ON sku_varients_varient.skuId = sku.id
	    LEFT JOIN varient ON varient.id = sku_varients_varient.varientId
      WHERE
	    product.producttype = '${productType}'
      GROUP BY
	    sku.id
      `);
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
      return await this.skuRepo
        .createQueryBuilder('sku')
        .leftJoinAndSelect('sku.varients', 'varients')
        .where('sku.id = :id', { id: id })
        .getOne();
      // return await this.skuRepo.findOneOrFail(id);
    } catch (error) {
      // console.log(error)
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

  async getProductIdAndQuanTityBySkuId(id: number,wid: number) {
    try {
      return await this.productRepo
        .createQueryBuilder('product')
        .leftJoin('product.skus', 'skus')
        .leftJoin('skus.stock', 'stock')
        .leftJoin('skus.warehouse', 'warehouse')
        .addSelect('product.id')
        .where('skus.id =:id', { id: id })
        .where('warehouse.id =:wid',{ wid: wid})
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

  async getAllWarehousewithProductId(id: number) {
    try {
      return await this.productRepo.query(`SELECT
      w.warehousename,
      SUM(st.quantity) quantity
    FROM
      sku s
      LEFT JOIN stock st ON s.id = st.skuId
      LEFT JOIN product p ON s.productId = p.id
      INNER JOIN warehouse w ON st.warehouseId = w.id
    WHERE
      p.id = ${id}
    GROUP BY
      st.warehouseId`);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getAllWarehousewithSkuId(id: number) {
    try {
      return await this.skuRepo.query(`SELECT
     w.warehousename,
     SUM(st.quantity) quantity
   FROM
     sku s
     LEFT JOIN stock st ON s.id = st.skuId
     INNER JOIN warehouse w ON st.warehouseId = w.id
   WHERE
     s.id = ${id}
   GROUP BY
     st.warehouseId`);
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
      await this.productRepo.findOneOrFail(id);
      return await this.productRepo.save(product);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }
}
