import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddjustDescriptionEntity, AdjustEntity } from './entity/adjust.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdjustEntity, AddjustDescriptionEntity], 'data'),
  ],
})
export class AddjustModule {}
