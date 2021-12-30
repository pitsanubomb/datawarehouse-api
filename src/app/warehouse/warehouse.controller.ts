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
import { addSkuDto, WarehouseDto } from './dto/warehouse.dto';

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

  @Post('addsku')
  // @ApiBody({ type: addSkuDto })
  async addSku(@Body() body: any) {
    return await this.warhouseService.addSku(body);
  }

  @Post('managesku')
  @ApiBody({ type: addSkuDto })
  async setSku(@Body() body: any) {
    return await this.warhouseService.manageSku(body);
  }

  @Get()
  async getAll() {
    return await this.warhouseService.findAll();
  }

  @Get('active')
  async getAllActive() {
    return await this.warhouseService.findAciveAll();
  }

  @Get('/name/:name')
  async getName(@Param('name') name: string) {
    return await this.warhouseService.findByName(name);
  }

  @Get('/not/:name')
  async getnotName(@Param('name') name: string) {
    return await this.warhouseService.findByNotName(name);
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
