import { IsString } from 'class-validator';

export class ImagesDto {
  @IsString()
  imagepath: string;

  @IsString()
  imagetype?: string;
}
