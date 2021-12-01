import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WarehouseController } from './warehouse.controller';
import { StockEntity, warehouseEntity } from './entity/warehouse.entity';
import { WarehouseService } from './warhouse.service';
import { SkuEntity } from '../product/entity/sku.entity';

@Module({
  imports: [TypeOrmModule.forFeature([warehouseEntity,SkuEntity,StockEntity], 'data')],
  controllers: [WarehouseController],
  providers: [WarehouseService],
})
export class WarehouseModule {}
