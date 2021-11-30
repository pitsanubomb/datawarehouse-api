import { CollectionDto } from './dto/collection.dto';
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
import { CollectionService } from './collection.service';

@Controller('collection')
@ApiTags('collection')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @Post()
  @ApiBody({ type: CollectionDto })
  async create(@Body() body: CollectionDto) {
    return await this.collectionService.create(body);
  }

  @Get()
  async getAll() {
    return await this.collectionService.findAll();
  }

  @Get('active')
  async getAllActive() {
    return await this.collectionService.findAciveAll();
  }

  @Get(':id')
  async getId(@Param('id') id: number) {
    return await this.collectionService.findById(id);
  }

  @Put(':id')
  @ApiBody({ type: CollectionDto })
  async edit(@Param('id') id: number, @Body() body: CollectionDto) {
    return await this.collectionService.edit(id, body);
  }
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.collectionService.delete(id);
  }
}
