import { WarehouseService } from './../warehouse/warhouse.service';
import { AdjustService } from './adjust.service';
import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { AdjustDto } from './dto/adjust.dto';
import { AdjustEntity } from './entity/adjust.entity';

@Controller('adjustment')
@ApiTags('Adjustment')
export class AddjustController {
  constructor(
    private adjustmentService: AdjustService,
    private readonly warehouseService: WarehouseService,
  ) {}

  @Post()
  async crate(@Body() body: AdjustDto): Promise<AdjustEntity> {
    const adj: AdjustEntity = await this.adjustmentService.createAdjust(body);
    if (!adj) {
      throw new InternalServerErrorException(`Can't adjust`);
    }

    let quantity: number;
    const sku = body.addjusttdescriptions[0].sku;
    const warehouse = body.warehouse;
    if (body.addjusttype === 'add' || body.addjusttype === 'set') {
      quantity = body.addjusttdescriptions[0].quantity;
    } else {
      quantity = -body.addjusttdescriptions[0].quantity;
    }

    await this.warehouseService.manageSku({ sku, warehouse, quantity });
    return adj;
  }

  @Get()
  async getAll() {
    return await this.adjustmentService.getAllAdjust();
  }

  @Get('warehouse')
  @ApiQuery({ name: 'id' })
  async getByWarehouseId(@Query('id') id: number) {
    return await this.adjustmentService.getByWarehouseId(id);
  }

  @Get(':id')
  async getbyId(@Param('id') id: number) {
    return await this.adjustmentService.getbyId(id);
  }
}
