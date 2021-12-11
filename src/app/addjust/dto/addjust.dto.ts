import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AddjuseDescription {
  @ApiProperty({ example: 0 })
  quantity: number;

  @ApiProperty({ example: 1, description: 'SKU id' })
  sku: any;
}

export class AddjustDto {
  @ApiProperty()
  refno: string;

  @ApiProperty()
  addjusttype: string;

  @ApiPropertyOptional({ type: [AddjuseDescription] })
  adjusedescriptions?: AddjuseDescription[];

  @ApiPropertyOptional({ type: 'string', description: '', example: 'active' })
  status?: string;

  @ApiPropertyOptional({example: 1})
  warehouse?: any;
}
