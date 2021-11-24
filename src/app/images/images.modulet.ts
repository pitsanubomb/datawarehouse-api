import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesEntity } from './entity/images.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ImagesEntity], 'data')],
})
export class ImageModule {}
