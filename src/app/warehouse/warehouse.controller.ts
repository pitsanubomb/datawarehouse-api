import { WarehouseService } from './warhouse.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { WarehouseDto } from './dto/warehouse.dto';

@Controller('warehouse')
@ApiTags('warehouse')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class WarehouseController {
  constructor(private readonly warhouseService: WarehouseService) {}

  @Post()
  @ApiBody({ type: WarehouseDto })
  async create(@Body() body: WarehouseDto) {
    return await this.warhouseService.create(body);
  }

  @Get()
  async getAll() {
    return await this.warhouseService.findAll();
  }

  @Get('active')
  async getAllActive() {
    return await this.warhouseService.findAciveAll();
  }

  @Get(':id')
  async getId(@Param('id') id: number) {
    return await this.warhouseService.findById(id);
  }

  @Put(':id')
  @ApiBody({ type: WarehouseDto })
  async edit(@Param('id') id: number, @Body() body: WarehouseDto) {
    return await this.warhouseService.edit(id, body);
  }
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.warhouseService.delete(id);
  }
}
