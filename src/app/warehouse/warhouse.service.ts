import { WarehouseDto } from './dto/warehouse.dto';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { warehouseEntity } from './entity/warehouse.entity';

@Injectable()
export class WarehouseService {
  constructor(
    @InjectRepository(warehouseEntity, 'data')
    private readonly warehouseRepo: Repository<warehouseEntity>,
  ) {}

  async create(warehouse: WarehouseDto) {
    try {
      return this.warehouseRepo.save(warehouse);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findById(id: number) {
    try {
      return this.warehouseRepo.findOneOrFail({ where: { id: id } });
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
