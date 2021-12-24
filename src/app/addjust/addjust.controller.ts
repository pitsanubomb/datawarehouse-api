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
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdjustDto } from './dto/adjust.dto';
import { AdjustEntity } from './entity/adjust.entity';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

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
    if ((body.status === 'approve')) saveBody.approveby = user.user.name;
    const adj: any = await this.adjustmentService.createAdjust(body);
    if (!adj) {
      throw new InternalServerErrorException(`Can't adjust`);
    }

    if (body.status === 'approve') {
      body.addjustdescriptions.forEach(async (item) => {
        let quantity: number;
        const sku = item.sku;
        const warehouse = body.warehouse;
    
        if (item.addjusttype === '1') {
          quantity = item.quantity;
        } else {
          quantity = -item.quantity;
        }

        await this.warehouseService.manageSku({ sku, warehouse, quantity });
      });
    }

    return adj;
  }

  @Get()
  async getAll() {
    return await this.adjustmentService.getAllAdjust();
  }

  @Get('addjustdescriptions/:type')
 async getAllAdjustdes(@Param('type') type: string){
   return await this.adjustmentService.searchAdjustDescription(type)
 }


  @Get(':id')
  async getbyId(@Param('id') id: number) {
    return await this.adjustmentService.getById(id);
  }

  @Put(':id')
  async ediAdjust(@Param('id') id:number, @Body() body: AdjustDto,@Request() { user }):Promise<AdjustEntity>{
    let saveBody: any = body;
    if ((body.status === 'approve')) saveBody.approveby = user.user.name;
    const adj: any = await this.adjustmentService.createAdjust(body);
    if (!adj) {
      throw new InternalServerErrorException(`Can't adjust`);
    }

    if (body.status === 'approve') {
      body.addjustdescriptions.forEach(async (item) => {
        let quantity: number;
        const sku = item.sku;
        const warehouse = body.warehouse;
        if (item.addjusttype === '0' || item.addjusttype === '1') {
          quantity = item.quantity;
        } else {
          quantity = -item.quantity;
        }
        await this.warehouseService.manageSku({ sku, warehouse, quantity });
      });
    }

    return adj;
  }
}
