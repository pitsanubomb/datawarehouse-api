import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class Addjusttdescriptions {
  @ApiProperty({ example: 0 })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({ example: 1, description: 'SKU id' })
  @IsString()
  @IsNotEmpty()
  sku: any;
}

export class AdjustDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  refno: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  addjusttype: string;

  @ApiProperty()
  @IsArray()
  @Type(() => Addjusttdescriptions)
  @IsNotEmpty()
  @ApiPropertyOptional({ type: [Addjusttdescriptions] })
  addjusttdescriptions: Addjusttdescriptions[];

  @ApiPropertyOptional({ type: 'string', description: '', example: 'active' })
  status?: string;

  @ApiPropertyOptional({ example: 1 })
  warehouse?: any;
}
