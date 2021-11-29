import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { supplierDto } from './dto/dto';
import { SupplierEntity } from './entity/entity';

@Injectable()
export class SupplierService {
  constructor(
    @InjectRepository(SupplierEntity, 'data')
    private readonly supplierepo: Repository<SupplierEntity>,
  ) {}

  async create(supplier: supplierDto) {
    try {
      return await this.supplierepo.save(supplier);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    try {
      const [res, count] = await this.supplierepo.findAndCount();
      return { data: res, total: count };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findbyId(id: Number) {
    try {
      return await this.supplierepo.findOneOrFail({ where: { id: id } });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async edit(id: number, body: supplierDto) {
    try {
      let edit = await this.findbyId(id);
      edit.suppliername = body.suppliername;
      return await this.supplierepo.save(edit);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
  
  async del(id: number) {
      let del = await this.findbyId(id);
      this.supplierepo.remove(del)
  }
}
