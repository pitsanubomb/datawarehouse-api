import { ApiProperty } from '@nestjs/swagger';

export class CollectionDto {
  @ApiProperty({ description: 'collection name', example: 'winter' })
  collectionname: string;

  @ApiProperty({ example: 'active' })
  status?: string;
}
