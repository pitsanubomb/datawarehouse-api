import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionService } from './collection.service';
import { CollectionController } from './category.controller';
import { CollectionEntity } from './entity/collection.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CollectionEntity], 'data')],
  controllers: [CollectionController],
  providers: [CollectionService],
})
export class CollectionModule {}
