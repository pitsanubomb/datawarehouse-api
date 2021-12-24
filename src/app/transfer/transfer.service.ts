import { TransferEntity } from './entity/transfer.entity';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { transferDto } from './dto/transfer.dto';

@Injectable()
export class TransferService {
  constructor(
    @InjectRepository(TransferEntity, 'data')
    private transferRepo: Repository<TransferEntity>,
  ) {}

  async create(body: any) {
    try {
      return await this.transferRepo.save(body);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findbyWarehouseForm(warehouseName: string) {
    try {
      return await this.transferRepo
        .createQueryBuilder('transfer')
        .leftJoinAndSelect('transfer.transfer_description', 'transfer_description')
        .leftJoinAndSelect('transfer_description.sku', 'sku')
        .leftJoinAndSelect('transfer.form', 'form')
        .leftJoinAndSelect('transfer.to', 'to')
        .where('form.warehousename = :warehouseName', { warehouseName })
        .getMany();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findbyWarehouseTo(warehouseName: string) {
    try {
      return await this.transferRepo
        .createQueryBuilder('transfer')
        .leftJoinAndSelect('transfer.to', 'to')
        .where('to.warehousename = :warehouseName', { warehouseName })
        .getMany();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
