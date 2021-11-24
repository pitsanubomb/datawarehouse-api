import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ImagesDto } from 'src/app/images/dto/images.dto';

export class ProductDto {
  @IsString()
  @IsNotEmpty()
  productname: string;

  producttype?: string;

  status: string;

  @IsString()
  description: string;

  @IsNumber()
  weight: number;

  @IsBoolean()
  isContinuesell: boolean;

  @IsBoolean()
  isMultipleoptions: boolean;

  @IsBoolean()
  isPos: boolean;

  @IsBoolean()
  isOnline: boolean;
}

export class createProduct extends ProductDto {
  skus: CreateSkuDto[];
  images?: ImagesDto[];
}

export class CreateSkuDto {
  @IsString()
  sku: string;

  @IsString()
  barcode: string;

  @IsString()
  skuname?: string;

  @IsNumber()
  price: number;

  @IsNumber()
  cost: number;

  @IsNumber()
  margin: number;

  status: string;
}
