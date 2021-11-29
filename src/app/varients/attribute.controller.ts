import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { AttributeService } from './attribute.service';
import { addAttributeDto } from './dto/attribute.dto';
@Controller('attribute')
@ApiTags('Attribute')
@ApiBearerAuth()
export class AttributeController {
  constructor(private readonly attributeService: AttributeService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  addAttribute(@Body() body: addAttributeDto) {
    return this.attributeService.craateAttribute(body);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getAllAtrributes() {
    return this.attributeService.getAll();
  }

  @Get('varients')
  @UseGuards(JwtAuthGuard)
  getVarietbyAll() {
    return this.attributeService.findVarientAll();
  }

  @Get('varients/:id')
  @UseGuards(JwtAuthGuard)
  getVarietbyId(@Param('id') id: number) {
    return this.attributeService.findVarient(id);
  }
}
