import { SupplierController } from './supplier.controller';
import { SupplierEntity } from './entity/entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierService } from './supplier.service';

@Module({
  imports: [TypeOrmModule.forFeature([SupplierEntity], 'data')],
  controllers:[SupplierController],
  providers:[SupplierService]
})
export class SupplierModule {}
