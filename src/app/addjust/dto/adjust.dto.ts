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

export class Addjusttdescriptions {
  @ApiProperty({ example: 0 })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({ example: 1, description: 'SKU id' })
  @IsString()
  @IsNotEmpty()
  sku: any;

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

  @ApiPropertyOptional({ type: 'string', description: '', example: 'active' })
  status?: string;


  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  warehouse?: any;
}
