import { createProduct } from './dto/product.dto';
import { ProductService } from './product.service';
import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ImageService } from '../images/image.service';

@Controller('product')
@ApiTags('Product')
export class ProductController {
  constructor(
    private productService: ProductService,
    private imgService: ImageService,
  ) {}

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

  @Get('table')
  @ApiQuery({ name: 'skip' })
  @ApiQuery({ name: 'take' })
  async getAllQueryTable(
    @Query('skip') skip: number,
    @Query('take') take: number,
  ) {
    if (skip == 1) skip = 0;
    else skip = (skip - 1) * take + 1;
    const { data, total } = await this.productService.queryTable(skip, take);
    let res = [];

    for (const item of data) {
      try {
        const { imagepath } = await this.imgService.findImageByPid(item.id);
        item.img = imagepath;
      } catch (error) {}
      res.push(item);
    }
    return { data: res, total: parseInt(total) };
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
