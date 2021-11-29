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
import { supplierDto } from './dto/dto';
import { SupplierService } from './supplier.service';

@Controller('supplier')
@ApiTags('Supplier')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class SupplierController {
  constructor(private readonly supplerService: SupplierService) {}

  @Post()
  @ApiBody({ type: supplierDto })
  async create(@Body() body: supplierDto) {
    return await this.supplerService.create(body);
  }

  @Get()
  async getAll() {
    return await this.supplerService.findAll();
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    return await this.supplerService.findbyId(id);
  }

  @Put(':id')
  @ApiBody({ type: supplierDto })
  async edit(@Param('id') id: number, @Body() body: supplierDto) {
    return await this.supplerService.edit(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    this.supplerService.del(id);
  }
}
