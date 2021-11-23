import { IsNotEmpty, IsString } from 'class-validator';

export class AttributeDto {
  @IsString()
  @IsNotEmpty()
  attributename: string;

  status: string;
}

export class addAttributeDto extends AttributeDto {
  varients: VarientDto[];
}

export class VarientDto {
  @IsString()
  @IsNotEmpty()
  varientname: string;
}
