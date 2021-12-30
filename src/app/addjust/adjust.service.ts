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

  async getAllAdjust(search?: string, page?: number, perpage?: number) {
    try {
      if (search) {
        const [res, count] = await this.adjustRepo.findAndCount({
          relations: ['addjustdescriptions'],
          order: {
            id: 'DESC',
          },
          where: { addjusttype: search },
          skip: page,
          take: perpage,
          cache: true,
        });
        return { data: res, total: count };
      }
      const [res, count] = await this.adjustRepo.findAndCount({
        relations: ['addjustdescriptions'],
        order: {
          id: 'DESC',
        },
        skip: page,
        take: perpage,
        cache: true,
      });
      return { data: res, total: count };
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

  async searchAdjustDescription(
    adjustType?: string,
    page?: number,
    perpage?: number,
  ) {
    try {
      const queryBuilder = this.adjustRepo.createQueryBuilder('adjustment');
      if (adjustType) {
        queryBuilder
          .leftJoin('adjustment.addjustdescriptions', 'addjustdescriptions')
          .leftJoinAndSelect(`adjustment.warehouse`, 'warehouse')
          .leftJoinAndSelect('addjustdescriptions.sku', 'sku')
          .where('addjustdescriptions.addjusttype = :adjustType', {
            adjustType: adjustType,
          })
          // .select(['addjustdescriptions', 'warehouse', 'sku'])
          .orderBy('addjustdescriptions.id', 'DESC');
      } else {
        queryBuilder
          .leftJoin('adjustment.addjustdescriptions', 'addjustdescriptions')
          .leftJoinAndSelect(`adjustment.warehouse`, 'warehouse')
          .leftJoinAndSelect('addjustdescriptions.sku', 'sku')
          // .select(['addjustdescriptions', 'warehouse', 'sku'])
          .orderBy('addjustdescriptions.id', 'DESC');
      }

      let res: any;
      const { count } = await queryBuilder
        .select('COUNT(*)', 'count')
        .getRawOne();

      if (page)
        res = await queryBuilder
          .offset(--page)
          .limit(perpage)
          .select(['addjustdescriptions', 'warehouse', 'sku'])
          .getRawMany();
      else
        res = await queryBuilder
          .select(['addjustdescriptions', 'warehouse', 'sku'])
          .getRawMany();

      return { data: res, count: count };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
