import { VendorEntity } from './entity/vendor.entity';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VendorDto } from './dto/vendor.dto';

@Injectable()
export class VendorService {
  constructor(
    @InjectRepository(VendorEntity, 'data')
    private readonly vendorRepo: Repository<VendorEntity>,
  ) {}

  async create(body: VendorDto) {
    try {
      return await this.vendorRepo.save(body);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findbyId(id: number) {
    try {
      return await this.vendorRepo.findOneOrFail(id);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async edit(body: VendorDto, id: number) {
    try {
      let edit = await this.vendorRepo.findOne(id);
      edit.vendorname = body.vendorname;
      edit.status = body.status;
      return await this.vendorRepo.save(edit);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async delete(id: number) {
    try {
      let del = await this.vendorRepo.findOne(id);
      return await this.vendorRepo.remove(del);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getAll() {
    try {
      const [res, count] = await this.vendorRepo.findAndCount();
      return { data: res, total: count };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getAllactive() {
    try {
      const [res, count] = await this.vendorRepo.findAndCount({
        where: { status: 'active' },
      });
      return { data: res, total: count };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
