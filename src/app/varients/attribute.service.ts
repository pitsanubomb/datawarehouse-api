import { addAttributeDto } from './dto/attribute.dto';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { AttributeEntity } from './entity/attribute.entity';
import { VarientEntity } from './entity/varients.entity';

@Injectable()
export class AttributeService {
  constructor(
    @InjectRepository(AttributeEntity, 'data')
    private readonly attributeRepository: Repository<AttributeEntity>,
    @InjectRepository(VarientEntity, 'data')
    private readonly varientsRepository: Repository<VarientEntity>,
  ) {}
  async craateAttribute(addData: addAttributeDto) {
    try {
      return await this.attributeRepository.save(addData);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getAll() {
    try {
      return await this.attributeRepository.find({
        relations: ['varients'],
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getAllActive() {
    try {
      return await this.attributeRepository.find({
        relations: ['varients'],
        where: { status: 'active' },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findVarientAll() {
    try {
      return await this.varientsRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findVarientAllActive() {
    try {
      return await this.varientsRepository.find({
        where: { status: 'active' },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findVarient(id: number) {
    try {
      return await this.varientsRepository.findOneOrFail({ where: { id: id } });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAtrributeFormVarient(id: number) {
    try {
      return this.attributeRepository
        .createQueryBuilder('attribute')
        .leftJoin('attribute.varients', 'varients')
        .where('varients.id = :id', { id })
        .getOneOrFail();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
