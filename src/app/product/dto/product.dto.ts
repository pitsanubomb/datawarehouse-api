import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { VarientwithIdDto } from 'src/app/varients/dto/attribute.dto';

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

  @IsNumber()
  price: number;

  @IsNumber()
  cost: number;

  @IsNumber()
  margin: number;

  varients?: VarientwithIdDto[];

  status: string;
}
