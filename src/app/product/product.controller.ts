import { createProduct } from './dto/product.dto';
import { ProductService } from './product.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';

@Controller('product')
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

  @Get('total')
  async getAllwithCount() {
    return await this.productService.getAllwithCount();
  }
}
