import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
  isPos: boolean;

  @IsBoolean()
  isOnline: boolean;
}

export class createProduct extends ProductDto {
  skus: CreateSkuDto[];
}

export class CreateSkuDto {
  @IsString()
  sku: string;

  @IsString()
  barcode: string;

  skuname?: string;

  @IsNumber()
  price: number;

  @IsNumber()
  cost: number;

  @IsNumber()
  margin: number;

  status: string;
}
