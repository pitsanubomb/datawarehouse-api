import { ApiProperty } from '@nestjs/swagger';

export class supplierDto {
  @ApiProperty({ example: 'supa' })
  suppliername: string;

  @ApiProperty({ example: 'active' })
  status?: string;
}
