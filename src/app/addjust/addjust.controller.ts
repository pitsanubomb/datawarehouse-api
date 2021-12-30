import { WarehouseService } from './../warehouse/warhouse.service';
import { AdjustService } from './adjust.service';
import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Request,
  Param,
  Post,
  UseGuards,
  Put,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AdjustDto } from './dto/adjust.dto';
import { AdjustEntity } from './entity/adjust.entity';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { Adjusttype } from '../core/enum/adjusttype.enum';

@Controller('adjustment')
@ApiTags('Adjustment')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class AddjustController {
  constructor(
    private adjustmentService: AdjustService,
    private readonly warehouseService: WarehouseService,
  ) {}

  @Post()
  async create(
    @Body(ValidationPipe) body: AdjustDto,
    @Request() { user },
  ): Promise<AdjustEntity> {
    let saveBody: any = body;
    saveBody.createby = user.user.name;
    if (body.status === '0') saveBody.approveby = user.user.name;
    const adj: any = await this.adjustmentService.createAdjust(body);
    if (!adj) {
      throw new InternalServerErrorException(`Can't adjust`);
    }

    if (body.status === '0') {
      for (const item of body.addjustdescriptions) {
        let quantity: number;
        const sku = item.sku;
        const warehouse = body.warehouse;

        if (item.addjusttype === '1') {
          quantity = item.quantity;
        } else if (item.addjusttype === '2') {
          quantity = -item.quantity;
        } else if (item.addjusttype === '0') {
          const { sum } = await this.warehouseService.getStockBySkuId(
            sku,
            warehouse,
          );

          if (sum > 0) {
            quantity = item.quantity - sum;
          } else {
            quantity = item.quantity + sum;
          }
        }

        await this.warehouseService.manageSku({ sku, warehouse, quantity });
      }
    }

    return adj;
  }

  @Get()
  @ApiQuery({
    name: 'type',
    required: false,
    description: 'Adjustment type',
    type: 'enum',
    enum: Adjusttype,
  })
  @ApiQuery({ name: 'page', required: false, type: 'number' })
  @ApiQuery({ name: 'perpage', required: false, type: 'number' })
  async getAll(
    @Query('type') type?: string,
    @Query('page') page?: number,
    @Query('perpage') perpage?: number,
  ) {
    if (page === 1) page = 0;
    if (page !== 1) page = (page - 1) * perpage + 1;
    return await this.adjustmentService.getAllAdjust(type, page, perpage);
  }

  @Get('addjustdescriptions')
  @ApiQuery({
    name: 'type',
    required: false,
    type: 'enum',
    enum: Adjusttype,
  })
  @ApiQuery({ name: 'page', required: false, type: 'number' })
  @ApiQuery({ name: 'perpage', required: false, type: 'number' })
  async getAllAdjustdes(
    @Query('type') type?: string,
    @Query('page') page?: number,
    @Query('perpage') perpage?: number,
  ) {
    if (page === 1) page = 0;
    if (page !== 1) page = (page - 1) * perpage + 1;
    return await this.adjustmentService.searchAdjustDescription(
      type,
      page,
      perpage,
    );
  }

  @Get(':id')
  async getbyId(@Param('id') id: number) {
    return await this.adjustmentService.getById(id);
  }

  @Put(':id')
  async ediAdjust(
    @Param('id') id: number,
    @Body() body: AdjustDto,
    @Request() { user },
  ): Promise<AdjustEntity> {
    let saveBody: any = body;
    if (body.status === '0') saveBody.approveby = user.user.name;
    const adj: any = await this.adjustmentService.createAdjust(body);
    if (!adj) {
      throw new InternalServerErrorException(`Can't adjust`);
    }

    for (const item of body.addjustdescriptions) {
      let quantity: number;
      const sku = item.sku;
      const warehouse = body.warehouse;

      if (item.addjusttype === '1') {
        quantity = item.quantity;
      } else if (item.addjusttype === '2') {
        quantity = -item.quantity;
      } else if (item.addjusttype === '0') {
        const { sum } = await this.warehouseService.getStockBySkuId(
          sku,
          warehouse,
        );

        if (sum > 0) {
          quantity = item.quantity - sum;
        } else {
          quantity = item.quantity + sum;
        }
      }

      await this.warehouseService.manageSku({ sku, warehouse, quantity });
    }

    return adj;
  }
}
