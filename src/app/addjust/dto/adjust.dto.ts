import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsOptional,
  IsNumber,
  ValidateNested,
  IsEnum,
} from 'class-validator';
import { Adjusttype } from 'src/app/core/enum/adjusttype.enum';
import { Status } from 'src/app/core/enum/status.enum';

export class Addjusttdescriptions {
  @ApiProperty({ example: 0 })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({ example: '1', description: 'SKU id' })
  @IsNumber()
  @IsNotEmpty()
  sku: number;

  @ApiProperty({ enum: Adjusttype })
  @IsNotEmpty()
  @IsEnum(Adjusttype)
  addjusttype: Adjusttype;
}

export class AdjustDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  refno: string;

  @ApiProperty({ type: [Addjusttdescriptions] })
  @IsArray()
  @Type(() => Addjusttdescriptions)
  @IsNotEmpty()
  @ValidateNested({ each: true })
  addjustdescriptions: Addjusttdescriptions[];

  @ApiProperty({
    type: 'string',
    enum: Status,
    description: 'Document status',
    example: '0',
  })
  status: string;

  @ApiProperty({
    type: 'string',
    enum: Status,
    description: 'Adjust status for filter in Adjustpage',
    example: '0',
  })
  addjusttype: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  warehouse?: any;
}
