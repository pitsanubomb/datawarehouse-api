import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';

export class WarehouseDto {
  @ApiProperty({ description: 'category name', example: 'cloth' })
  warehousename: string;

  @ApiProperty({ description: 'category description' })
  @Column({ nullable: true })
  description?: string;

  @ApiProperty({ example: 'active' })
  status?: string;
}
