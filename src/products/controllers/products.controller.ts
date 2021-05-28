import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductsService } from 'src/products/services/products.service';
import { CustomParseIntPipe } from 'src/common/parse-int.pipe';
import {
  CreateProductDto,
  UpdateProductDto,
} from 'src/products/dtos/products.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}
  @Get()
  @ApiOperation({ summary: 'List of products' })
  async getProducts(@Query('limit') limit = 100, @Query('offset') offset = 0) {
    return {
      message: 'Products listed',
      data: await this.productService.findAll(),
    };
  }
  @Get('/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  async getProduct(@Param('id', ParseIntPipe) id: number) {
    return {
      message: 'Product retrieved',
      data: await this.productService.findOne(id),
    };
  }
  @Get('/filter')
  @HttpCode(HttpStatus.ACCEPTED)
  getProductFilter() {
    return {
      message: 'Soy el filtro',
    };
  }
  @Post()
  async create(@Body() payload: CreateProductDto) {
    return {
      message: 'product created',
      data: await this.productService.create(payload),
    };
  }
  @Put('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto,
  ) {
    return {
      message: 'Product updated',
      data: await this.productService.update(id, payload),
    };
  }
  @Delete('/:id')
  async delete(@Param('id', CustomParseIntPipe) id: number) {
    await this.productService.delete(id);
    return {
      message: 'Product deleted',
    };
  }
}
