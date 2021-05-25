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
  getProducts(@Query('limit') limit = 100, @Query('offset') offset = 0) {
    return {
      message: 'Products listed',
      data: this.productService.findAll(),
    };
  }
  @Get('/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  getProduct(@Param('id', ParseIntPipe) id: number) {
    return {
      message: 'Product retrieved',
      data: this.productService.findOne(id),
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
  create(@Body() payload: CreateProductDto) {
    return {
      message: 'product created',
      data: this.productService.create(payload),
    };
  }
  @Put('/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto,
  ) {
    return {
      message: 'Product updated',
      data: this.productService.update(id, payload),
    };
  }
  @Delete('/:id')
  delete(@Param('id', CustomParseIntPipe) id: number) {
    this.productService.delete(id);
    return {
      message: 'Product deleted',
    };
  }
}
