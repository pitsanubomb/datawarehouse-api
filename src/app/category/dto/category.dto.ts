import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';

export class CategoryDto {
  @ApiProperty({ description: 'category name', example: 'cloth' })
  categoryname: string;

  @ApiProperty({ description: 'category description' })
  @Column({ nullable: true })
  description?: string;

  @ApiProperty({ example: 'active' })
  status?: string;
}
