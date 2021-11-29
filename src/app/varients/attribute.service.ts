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

  async findVarient(id: number) {
    try {
      return await this.varientsRepository.findOneOrFail({where: {id: id}})
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
