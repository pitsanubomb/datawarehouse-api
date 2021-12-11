import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddjustController } from './addjust.controller';
import { AdjustService } from './adjust.service';
import { AddjustDescriptionEntity, AdjustEntity } from './entity/adjust.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdjustEntity, AddjustDescriptionEntity], 'data'),
  ],
  providers: [AdjustService],
  controllers:[AddjustController]
})
export class AddjustModule {}
