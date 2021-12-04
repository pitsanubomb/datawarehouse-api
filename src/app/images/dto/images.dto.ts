import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ImagesDto {
  @ApiProperty()
  @IsString()
  imagepath: string;


  @ApiPropertyOptional()
  @IsString()
  imagetype?: string;
}
