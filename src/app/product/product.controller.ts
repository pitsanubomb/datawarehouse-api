import { createProduct } from './dto/product.dto';
import { ProductService } from './product.service';
import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ImageService } from '../images/image.service';

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

  @Get('table')
  @ApiQuery({ name: 'skip' })
  @ApiQuery({ name: 'take' })
  async getAllQueryTable(
    @Query('skip') skip: number,
    @Query('take') take: number,
  ) {
    if (skip !== 1) skip = (skip - 1) * take + 1;
    return await this.productService.queryTable(--skip, take);
  }

  @Get('sku')
  async getAllSku() {
    return await this.productService.getAllSku();
  }

  @Get(':id')
  async getId(@Param('id') id: number) {
    return await this.productService.getProductId(id);
  }

  @Put(':id')
  async editProduct(@Param('id') id: number, @Body() body: any) {
    return await this.productService.editProduct(id, body);
  }

  @Get('sku/:sku')
  async getSkubysku(@Param('sku') sku: string) {
    return await this.productService.getSkuBysku(sku);
  }

  @Get('sku/product/type')
  @ApiQuery({ name: 'producttype'})
  async getSkubySinglesku(@Query('producttype') producttype: string) {
    return await this.productService.getAllSkuwithStatus(producttype);
  }

  @Get('quantity/sku/:id')
  async getallQuantity(@Param('id') id: number) {
    return await this.productService.getAllWarehousewithSkuId(id);
  }

  @Get('quantity/product/:id')
  async getallQuantitywithPid(@Param('id') id: number) {
    return await this.productService.getAllWarehousewithProductId(id);
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
