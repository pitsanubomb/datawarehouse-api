import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

export class DescriptionDto {
  @ApiProperty({ example: 0 })
  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({ example: '1', description: 'SKU id' })
  @IsString()
  @IsNotEmpty()
  sku: string;
}

export class transferDto {
  @ApiProperty({ description: 'ref name', example: 'ref001' })
  ref: string;

  @ApiPropertyOptional({ description: 'shipping no', example: 'ship001' })
  shippingno?: string;

  @ApiProperty({ description: 'origin warehouse', example: [{ id: 1 }] })
  form: [
    {
      id: any;
    },
  ];

  @ApiProperty({ description: 'destination warehouse', example: [{ id: 2 }] })
  to: [
    {
      id: any;
    },
  ];

  @ApiPropertyOptional({ description: 'shipping cost', example: 20 })
  cost?: number;

  @ApiProperty({ description: 'orderby user', example: 'admin' })
  orderby: string;

  @ApiPropertyOptional({ description: 'approveby user', example: 'admin' })
  approveby?: string;

  @ApiPropertyOptional({ description: 'shipping date', example: '11/12/22' })
  shippingdate?: Date;

  @ApiProperty({ type: [DescriptionDto] })
  @IsNotEmpty()
  @IsArray()
  @Type(() => DescriptionDto)
  @ValidateNested({ each: true })
  transfer_description: DescriptionDto[];

  @ApiPropertyOptional({ example: 'draft', description: 'status' })
  status?: string;
}
