import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class VendorDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Apple', description: 'vendor name' })
  vendorname: string;
}
