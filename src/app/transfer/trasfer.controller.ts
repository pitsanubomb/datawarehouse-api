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
    let saveBody = body;
    saveBody.orderby = user.user.name;
    const res = await this.transferService.create(saveBody);

    if (body.status === 'approve') {
      body.transfer_description.forEach(async (item) => {
        const bodyForm = {
          sku: item.sku,
          quantity: -item.quantity,
          warehouse: body.form[0].id,
        };

        const bodyTo = {
          sku: item.sku,
          quantity: item.quantity,
          warehouse: body.to[0].id,
        };

        console.log(`Should to do this . . .`)

        await this.warehouseService.manageSku(bodyForm);
        await this.warehouseService.manageSku(bodyTo);
      });
    }

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
