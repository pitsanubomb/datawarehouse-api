import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AttributeService } from './attribute.service';
import { addAttributeDto } from './dto/attribute.dto';
@Controller('attribute')
export class AttributeController {
  constructor(private readonly attributeService: AttributeService) {}

  @Post()
  addAttribute(@Body() body: addAttributeDto) {
    return this.attributeService.craateAttribute(body);
  }

  @Get()
  getAllAtrributes() {
    return this.attributeService.getAll();
  }
  @Get('varients/:id')
  getVarietbyId(@Param('id') id: number) {
    return this.attributeService.findVarient(id);
  }
}
