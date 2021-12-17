import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdjustDto } from './dto/adjust.dto';
import { AdjustEntity } from './entity/adjust.entity';

@Injectable()
export class AdjustService {
  constructor(
    @InjectRepository(AdjustEntity, 'data')
    private readonly adjustRepo: Repository<AdjustEntity>,
  ) {}

  async createAdjust(body: AdjustDto) {
    try {
      return this.adjustRepo.save(body);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getAllAdjust() {
    try {
      const [data, total] = await this.adjustRepo.findAndCount();
      return { data: data, total: total };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getbyId(id: number): Promise<any> {
    try {
      return await this.adjustRepo.findOneOrFail(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getByWarehouseId(id: number): Promise<any> {
    try {
      console.log(id)
      return await this.adjustRepo.findOneOrFail({
        // relations:['waehouse'],
        where: { waehouse: id },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
