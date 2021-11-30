import { CategoryEntity } from './entity/category.entity';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity, 'data')
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async create(category: CategoryDto) {
    try {
      return this.categoryRepository.save(category);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findById(id: number) {
    try {
      return this.categoryRepository.findOneOrFail({ where: { id: id } });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    try {
      const [res, count] = await this.categoryRepository.findAndCount();
      return { data: res, total: count };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAciveAll() {
    try {
      const [res, count] = await this.categoryRepository.findAndCount({
        where: { status: 'active' },
      });
      return { data: res, total: count };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async edit(id: any, body: CategoryDto) {
    try {
      let edit = await this.findById(id);
      edit.categoryname = body.categoryname;
      edit.description = body.description;
      edit.status = body.status;

      this.categoryRepository.save(edit);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async delete(id: any) {
    try {
      let del = await this.findById(id);
      return this.categoryRepository.remove(del);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
