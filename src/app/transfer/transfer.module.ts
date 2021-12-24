import {
  TransferDescriptionEntity,
  TransferEntity,
} from './entity/transfer.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransferService } from './transfer.service';
import { TransferController } from './trasfer.controller';
import { WarehouseModule } from '../warehouse/warehouse.module';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [TransferEntity, TransferDescriptionEntity],
      'data',
    ),
    WarehouseModule,
  ],
  controllers: [TransferController],
  providers: [TransferService],
})
export class TransferModule {}
