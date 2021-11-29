import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ImagesDto } from 'src/app/images/dto/images.dto';

export class ProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'T-shirt', description: 'The product name' })
  productname: string;

  @ApiProperty({ example: 'single', description: 'The product type' })
  producttype?: string;

  @ApiProperty({ example: 'active', description: 'The product status' })
  status?: string;

  @ApiProperty({ example: '. . .', description: 'The product detail' })
  @IsString()
  description: string;

  @ApiProperty({
    example: 'Thailand',
    description: 'The product origin country',
  })
  @IsString()
  countryorigin?: string;

  @ApiProperty({ example: true, description: 'The product continuesell' })
  @IsBoolean()
  isContinuesell: boolean;

  @ApiProperty({
    example: true,
    description: 'The product have multiple options',
  })
  @IsBoolean()
  isMultipleoptions: boolean;

  @ApiProperty()
  vendor: [
    {
      id: any;
    },
  ];

  @ApiProperty({ example: true, description: 'The product is on pos' })
  @IsBoolean()
  isPos: boolean;

  @ApiProperty({ example: true, description: 'The product is online web' })
  @IsBoolean()
  isOnline: boolean;
}

export class createProduct extends ProductDto {
  @ApiProperty()
  skus: CreateSkuDto[];
  images?: ImagesDto[];
}

export class CreateSkuDto {
  @ApiProperty()
  @IsString()
  sku: string;

  @ApiProperty()
  @IsString()
  barcode: string;

  @ApiProperty()
  @IsString()
  skuname?: string;

  @ApiProperty()
  @IsNumber()
  compareprice?: number;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNumber()
  cost: number;

  @ApiProperty()
  @IsNumber()
  margin: number;

  @ApiProperty()
  @IsNumber()
  weight?: number;

  @ApiProperty()
  @IsNumber()
  width?: number;

  @ApiProperty()
  @IsNumber()
  height?: number;

  @IsNumber()
  long?: number;

  status?: string;

  images?: ImagesDto[];

  varients?: [
    {
      id: any;
    },
  ];
}
