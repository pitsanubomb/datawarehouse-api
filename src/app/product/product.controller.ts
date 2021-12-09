import { createProduct } from './dto/product.dto';
import { ProductService } from './product.service';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
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

  @Get('query')
  async getAllQuery() {
    return await this.productService.getAllQuery();
  }

  @Get('sku')
  async getAllSku() {
    return await this.productService.getAllSku();
  }

  @Get(':id')
  async getId(@Param('id') id: number) {
    return await this.productService.getPorductId(id);
  }

  @Put(':id')
  async editProduct(@Param('id') id: number, @Body() body: any) {
    return await this.productService.editProduct(id, body);
  }

  @Get('sku/:sku')
  async getSkubysku(@Param('sku') sku: string) {
    return await this.productService.getSkuBysku(sku);
  }
  @Get('sku/type/single')
  async getSkubySinglesku() {
    return await this.productService.getAllSingleSku();
  }

  @Get('sku/id/:id')
  async getSkubyId(@Param('id') id: number) {
    return await this.productService.getSkuById(id);
  }

  @Get('total')
  async getAllwithCount() {
    return await this.productService.getAllwithCount();
  }
  @Get('product/sku/:id')
  async getProductbySkuId(@Param('id') id: number) {
    return await this.productService.getPorductIdbySkuid(id);
  }
}
