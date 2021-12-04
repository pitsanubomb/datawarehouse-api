import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ImagesDto } from 'src/app/images/dto/images.dto';

export class ProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'T-shirt', description: 'The product name' })
  productname: string;

  @ApiProperty({ example: 'single', description: 'The product type' })
  producttype: string;

  @ApiPropertyOptional({ example: 'active', description: 'The product status' })
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

  @ApiPropertyOptional()
  vendor?: [
    {
      id: any;
    },
  ];

  @ApiPropertyOptional()
  supplier?: [
    {
      id: any;
    },
  ];

  @ApiPropertyOptional()
  category?: [
    {
      id: any;
    },
  ];

  @ApiPropertyOptional()
  collection?: [
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

  @ApiPropertyOptional({ type: [ImagesDto] })
  images?: ImagesDto[];

  @ApiPropertyOptional()
  varients?: [
    {
      id: any;
    },
  ];
}

export class createBundleDto {
  @ApiProperty({ description: 'sku id', example: 1 })
  sku: any;
  // @ApiProperty({ description: 'warehouse id', example: 1 })
  // product: any;
  @ApiProperty({ description: 'quantity', example: 100 })
  quantity: number;
}


export class createProduct extends ProductDto {
  @ApiPropertyOptional({ type: [CreateSkuDto] })
  skus?: CreateSkuDto[];

  @ApiPropertyOptional({ type: [createBundleDto] })
  bundle?: createBundleDto[];

  @ApiPropertyOptional({ type: [ImagesDto] })
  images?: ImagesDto[];
}
