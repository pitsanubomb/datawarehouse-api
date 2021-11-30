import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CollectionDto } from './dto/collection.dto';
import { CollectionEntity } from './entity/collection.entity';

@Injectable()
export class CollectionService {
  constructor(
    @InjectRepository(CollectionEntity, 'data')
    private readonly collectRepo: Repository<CollectionEntity>,
  ) {}

  async create(body: CollectionDto) {
    try {
      return this.collectRepo.save(body);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findById(id: number) {
    try {
      return this.collectRepo.findOneOrFail({ where: { id: id } });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    try {
      const [res, count] = await this.collectRepo.findAndCount();
      return { data: res, total: count };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAciveAll() {
    try {
      const [res, count] = await this.collectRepo.findAndCount({
        where: { status: 'active' },
      });
      return { data: res, total: count };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async edit(id: any, body: CollectionDto) {
    try {
      let edit = await this.findById(id);
      edit.collectionname = body.collectionname;
      edit.status = body.status;

      this.collectRepo.save(edit);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async delete(id: any) {
    try {
      let del = await this.findById(id);
      return this.collectRepo.remove(del);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
