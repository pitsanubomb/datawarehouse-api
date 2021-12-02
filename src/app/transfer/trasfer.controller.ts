import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { transferDto } from './dto/transfer.dto';
import { TransferService } from './transfer.service';

@Controller('transfer')
@ApiTags('Transfer')
export class TransferController {
  constructor(private readonly trasferService: TransferService) {}

  @Post()
  @ApiBody({ type: transferDto })
  create(@Body() body: transferDto) {
    return this.trasferService.create(body);
  }

  @Get(':id')
  async getformWarehouseName(@Param('id') id: string) {
    return this.trasferService.findbyWarehouseForm(id);
  }

  @Get('to/:id')
  async gettoWarehouseName(@Param('id') id: string) {
    return this.trasferService.findbyWarehouseTo(id);
  }
}
