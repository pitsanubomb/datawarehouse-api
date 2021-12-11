import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImagesEntity } from './entity/images.entity';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(ImagesEntity, 'data')
    private imageRepository: Repository<ImagesEntity>,
  ) {}

  async findImageByPid(id: number): Promise<any> {
    try {
      return await this.imageRepository.findOneOrFail({
        where: { product: id },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
