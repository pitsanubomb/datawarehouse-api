import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { VendorDto } from './dto/vendor.dto';
import { VendorService } from './vendor.service';

@Controller('vendor')
@ApiTags('Vendor')
@ApiBearerAuth()
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @Post()
  @ApiBody({ type: VendorDto })
  @UseGuards(JwtAuthGuard)
  async crate(@Body() body: VendorDto) {
    return await this.vendorService.create(body);
  }
  @Get()
  @UseGuards(JwtAuthGuard)
  async getAll() {
    return await this.vendorService.getAll();
  }

  @Put(':id')
  @ApiBody({ type: VendorDto })
  @UseGuards(JwtAuthGuard)
  async updateddate(@Body() body: VendorDto ,@Param('id') id:number) {
    return await this.vendorService.edit(body,id);
  }
}
