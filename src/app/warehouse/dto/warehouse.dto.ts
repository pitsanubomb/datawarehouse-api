import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column } from 'typeorm';

export class WarehouseDto {
  @ApiProperty({ description: 'warehouse name', example: 'w1' })
  warehousename: string;

  @ApiPropertyOptional({ description: 'adress', example: 'xxxxxxx' })
  address?: string;

  @ApiPropertyOptional({ description: 'latitude', example: 1098.72 })
  lattitude?: number;

  @ApiPropertyOptional({ description: 'latitude', example: 1098.72 })
  longitude?: number;

  @ApiPropertyOptional({ description: 'warehouse description' })
  description?: string;

  @ApiPropertyOptional({ description: 'John do' })
  contact?: string;

  @ApiProperty({ example: 'active' })
  status?: string;

  @ApiPropertyOptional({ description: 'returnflag' })
  isreturn: boolean;
}

export class addSkuDto {
  @ApiProperty({ description: 'sku id', example: 1 })
  sku: any;
  @ApiProperty({ description: 'warehouse id', example: 1 })
  warehouse: any;
  @ApiProperty({ description: 'quantity', example: 100 })
  quantity: number;
}
