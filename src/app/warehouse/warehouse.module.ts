import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WarehouseController } from './warehouse.controller';
import { warehouseEntity } from './entity/warehouse.entity';
import { WarehouseService } from './warhouse.service';

@Module({
  imports: [TypeOrmModule.forFeature([warehouseEntity], 'data')],
  controllers: [WarehouseController],
  providers: [WarehouseService],
})
export class WarehouseModule {}
