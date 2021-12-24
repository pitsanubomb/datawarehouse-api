import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { WarehouseService } from '../warehouse/warhouse.service';
import { transferDto } from './dto/transfer.dto';
import { TransferService } from './transfer.service';

@Controller('transfer')
@ApiTags('Transfer')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class TransferController {
  constructor(
    private readonly transferService: TransferService,
    private readonly warehouseService: WarehouseService,
  ) {}

  @Post()
  @ApiBody({ type: transferDto })
  async create(@Body(ValidationPipe) body: transferDto, @Request() { user }) {
    const saveBody = body;
    saveBody.orderby = user.user.username;

    if (body.status === 'approve') {
      body.transfer_description.forEach(async (item) => {
        let quantity = item.quantity;
        const sku = item.sku;
        const warehouse = body.to[0].id;

        await this.warehouseService.manageSku({ sku, warehouse, quantity });
      });
    }
    const res = await this.transferService.create(body);
    return res;
  }

  @Get(':id')
  async getformWarehouseName(@Param('id') id: string) {
    return this.transferService.findbyWarehouseForm(id);
  }

  @Get('to/:id')
  async gettoWarehouseName(@Param('id') id: string) {
    return this.transferService.findbyWarehouseTo(id);
  }
}
