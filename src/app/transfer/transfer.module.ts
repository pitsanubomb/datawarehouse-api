import { TransferEntity } from './entity/transfer.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransferService } from './transfer.service';
import { TransferController } from './trasfer.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TransferEntity], 'data')],
  controllers:[TransferController],
  providers: [TransferService]
})
export class TransferModule {}
