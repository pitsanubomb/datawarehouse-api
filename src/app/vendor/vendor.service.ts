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

  async edit(body: VendorDto,id:number) {
    let edit =   await this.vendorRepo.findOne(id)
    edit.vendorname = body.vendorname
    return await this.vendorRepo.save(edit)
  }

  async getAll() {
    try {
      const [res, count] = await this.vendorRepo.findAndCount();
      return { data: res, total: count };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
