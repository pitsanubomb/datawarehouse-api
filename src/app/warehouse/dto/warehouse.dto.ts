import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';

export class WarehouseDto {
  @ApiProperty({ description: 'warehouse name', example: 'w1' })
  warehousename: string;

  @ApiProperty({ description: 'warehouse description' })
  @Column({ nullable: true })
  description?: string;

  @ApiProperty({ example: 'active' })
  status?: string;
}

export class addSkuDto {
  @ApiProperty({ description: 'sku id', example: 1 })
  sku: any;
  @ApiProperty({ description: 'warehouse id', example: 1 })
  warehouse: any;
  @ApiProperty({ description: 'quantity', example: 100 })
  quantity: number;
}
