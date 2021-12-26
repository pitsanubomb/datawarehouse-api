import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdjustEntity } from './entity/adjust.entity';

@Injectable()
export class AdjustService {
  constructor(
    @InjectRepository(AdjustEntity, 'data')
    private readonly adjustRepo: Repository<AdjustEntity>,
  ) {}

  async createAdjust(body: any) {
    try {
      return this.adjustRepo.save(body);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getAllAdjust() {
    try {
      return await this.adjustRepo
        .createQueryBuilder('adjustment')
        .leftJoinAndSelect(
          'adjustment.addjustdescriptions',
          'addjustdescriptions',
        )
        .leftJoinAndSelect('addjustdescriptions.sku', 'sku')
        .leftJoinAndSelect(`adjustment.warehouse`, 'warehouse')
        .orderBy('adjustment.id', 'DESC')
        .getMany();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getById(id: number): Promise<AdjustEntity> {
    try {
      return this.adjustRepo.findOneOrFail(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async editAdjust(id: number, body: any): Promise<AdjustEntity> {
    try {
      await this.adjustRepo.findOneOrFail(id);
      return this.adjustRepo.save(body);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async searchAdjustDescription(adjustType: string) {
    try {
      return await this.adjustRepo
        .createQueryBuilder('adjustment')
        .leftJoin('adjustment.addjustdescriptions', 'addjustdescriptions')
        .leftJoinAndSelect(`adjustment.warehouse`, 'warehouse')
        .leftJoinAndSelect('addjustdescriptions.sku', 'sku')
        .where('addjustdescriptions.addjusttype = :adjustType', {
          adjustType: adjustType,
        })
        .select(['addjustdescriptions', 'warehouse', 'sku'])
        .orderBy('addjustdescriptions.id', 'DESC')
        .getRawMany();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
