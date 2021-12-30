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
        if (search !== '3') {
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
        } else if (search === '3') {
          const [res, count] = await this.adjustRepo.findAndCount({
            relations: ['addjustdescriptions'],
            order: {
              id: 'DESC',
            },
            where: [{ addjusttype: '1' },{ addjusttype: '2' }],
            skip: page,
            take: perpage,
            cache: true,
          });
          return { data: res, total: count };
        }
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
      queryBuilder
        .leftJoin('adjustment.addjustdescriptions', 'addjustdescriptions')
        .leftJoinAndSelect(`adjustment.warehouse`, 'warehouse')
        .leftJoinAndSelect('addjustdescriptions.sku', 'sku');

      if (adjustType) {
        if (adjustType !== '3')
          queryBuilder.where('addjustdescriptions.addjusttype = :adjustType', {
            adjustType: adjustType,
          });
        else
          queryBuilder.where(
            'addjustdescriptions.addjusttype IN (:adjustType)',
            {
              adjustType: ['1', '2'],
            },
          );
      }

      let res: any;
      const { count } = await queryBuilder
        .select('COUNT(*)', 'count')
        .getRawOne();

      if (page) await queryBuilder.offset(--page).limit(perpage);
      res = await queryBuilder
        .select(['addjustdescriptions', 'warehouse', 'sku', 'adjustment.refno'])
        .orderBy('addjustdescriptions.id', 'DESC')
        .getRawMany();

      return { data: res, count: count };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
