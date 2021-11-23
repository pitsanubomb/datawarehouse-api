import { createProduct, ProductDto } from './dto/product.dto';
import { ProductService } from './product.service';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  async addProduct(@Body() product: createProduct) {
    return await this.productService.crateProduct(product);
  }

  @Get()
  async getAll() {
    return await this.productService.getAll();
  }
}
