import { createProduct } from './dto/product.dto';
import { ProductService } from './product.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('product')
@ApiTags('Product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  @ApiBody({ type: createProduct })
  async addProduct(@Body() product: createProduct) {
    return await this.productService.crateProduct(product);
  }

  @Get()
  async getAll() {
    return await this.productService.getAll();
  }


  @Get('sku')
  async getAllSku() {
    return await this.productService.getAllSku();
  }

  @Get(':id')
  async getId(@Param('id') id: number) {
    return await this.productService.getPorductId(id);
  }

  @Get('sku/:sku')
  async getSkubysku(@Param('sku') sku: string) {
    return await this.productService.getSkuBysku(sku);
  }

  @Get('sku/id/:id')
  async getSkubyId(@Param('id') id: number) {
    return await this.productService.getSkuById(id);
  }

  @Get('total')
  async getAllwithCount() {
    return await this.productService.getAllwithCount();
  }
}
