import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class transferDto {
  @ApiProperty({ description: 'ref name', example: 'ref001' })
  ref: string;

  @ApiPropertyOptional({ description: 'shipping no', example: 'ship001' })
  shippingno?: string;


  @ApiProperty({ description: 'origin warehouse', example: [{ id: 1 }] })
  form: [
    {
      id: any;
    },
  ];

  @ApiProperty({ description: 'destination warehouse', example: [{ id: 2 }] })
  to: [
    {
      id: any;
    },
  ];

  @ApiPropertyOptional({ description: 'shipping cost', example: 20 })
  cost?: number;

  @ApiProperty({ description: 'orderby user', example: 'admin' })
  orderby: string;

  @ApiPropertyOptional({ description: 'approveby user', example: 'admin' })
  approveby?: string;

  @ApiPropertyOptional({ description: 'approve date', example: '11/12/22' })
  approvedate?: Date;

  @ApiPropertyOptional({ description: 'shipping date', example: '11/12/22' })
  shippingdate?: Date;

  @ApiPropertyOptional({ example: 'draft', description: 'status' })
  status?: string;
}
