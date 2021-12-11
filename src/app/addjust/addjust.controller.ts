import { AdjustService } from './adjust.service';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AddjustDto } from './dto/addjust.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('adjustment')
@ApiTags('Adjustment')
export class AddjustController {
  constructor(private adjustmentService: AdjustService) {}

  @Post()
  async crate(@Body() body: AddjustDto) {
    return await this.adjustmentService.createAddjust(body);
  }

  @Get()
  async getAll() {
    return await this.adjustmentService.getAllAdjust();
  }

  @Get('warehouse')
  @ApiQuery({ name: 'id' })
  async getByWarehouseId(@Query('id')  id: number) {
    return await this.adjustmentService.getByWarehouseId(id);
  }

  @Get(':id')
  async getbyId(@Param('id') id: number) {
    return await this.adjustmentService.getbyId(id);
  }

}
