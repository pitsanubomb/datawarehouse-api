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
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';

@Controller('category')
@ApiTags('category')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class CategoryController {
  constructor(private readonly categorService: CategoryService) {}

  @Post()
  @ApiBody({ type: CategoryDto })
  async create(@Body() body: CategoryDto) {
    return await this.categorService.create(body);
  }

  @Get()
  async getAll() {
    return await this.categorService.findAll();
  }

  @Get('active')
  async getAllActive() {
    return await this.categorService.findAciveAll();
  }

  @Get(':id')
  async getId(@Param('id') id: number) {
    return await this.categorService.findById(id);
  }

  @Put(':id')
  @ApiBody({ type: CategoryDto })
  async edit(@Param('id') id: number, @Body() body: CategoryDto) {
    return await this.categorService.edit(id, body);
  }
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.categorService.delete(id);
  }
}
