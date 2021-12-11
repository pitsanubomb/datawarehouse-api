import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesEntity } from './entity/images.entity';
import { ImageService } from './image.service';

@Module({
  imports: [TypeOrmModule.forFeature([ImagesEntity], 'data')],
  exports: [ImageService],
  providers: [ImageService],
})
export class ImageModule {}
