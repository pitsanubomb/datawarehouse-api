import { addSkuDto, WarehouseDto } from './dto/warehouse.dto';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Not, Repository } from 'typeorm';
import { StockEntity, warehouseEntity } from './entity/warehouse.entity';
import { SkuEntity } from '../product/entity/sku.entity';

@Injectable()
export class WarehouseService {
  constructor(
    @InjectRepository(warehouseEntity, 'data')
    private readonly warehouseRepo: Repository<warehouseEntity>,
    @InjectRepository(SkuEntity, 'data')
    private readonly skuRepo: Repository<SkuEntity>,
    @InjectRepository(StockEntity, 'data')
    private readonly stockrepo: Repository<StockEntity>,
  ) {}

  async create(warehouse: WarehouseDto) {
    try {
      return this.warehouseRepo.save(warehouse);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
  async addSku(body: any) {
    // this.skuRepo.find
    try {
      body.skus.forEach(async (sku) => {
        await this.stockrepo.save({
          sku: sku.id,
          warehouse: body.warehouse,
          quantity: body.quantity,
        });
      });
      return { success: true };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async addStock(body: addSkuDto) {
    // this.skuRepo.find
    try {
      return await this.stockrepo.save(body);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findById(id: number) {
    try {
      return this.warehouseRepo.findOneOrFail({ where: { id: id } });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findByName(name: string) {
    try {
      return this.warehouseRepo.findOneOrFail({
        where: { warehousename: name },
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findByNotName(name: string) {
    try {
      return this.warehouseRepo.find({ warehousename: Not(Equal(name)) });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    try {
      const [res, count] = await this.warehouseRepo.findAndCount();
      return { data: res, total: count };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAciveAll() {
    try {
      const [res, count] = await this.warehouseRepo.findAndCount({
        where: { status: 'active' },
      });
      return { data: res, total: count };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async edit(id: any, body: WarehouseDto) {
    try {
      let edit = await this.findById(id);
      edit.warehousename = body.warehousename;
      edit.description = body.description;
      edit.status = body.status;

      this.warehouseRepo.save(edit);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async delete(id: any) {
    try {
      let del = await this.findById(id);
      return this.warehouseRepo.remove(del);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
