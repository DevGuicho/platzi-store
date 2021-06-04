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
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from 'src/products/services/products.service';
import { CustomParseIntPipe } from 'src/common/parse-int.pipe';
import {
  CreateProductDto,
  FilterProductsDto,
  UpdateProductDto,
} from 'src/products/dtos/products.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/roles.model';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'List of products' })
  async getProducts(@Query() params: FilterProductsDto) {
    return {
      message: 'Products listed',
      data: await this.productService.findAll(params),
    };
  }

  @Public()
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
  @Roles(Role.ADMIN)
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
  @Put('/:id/category/:categoryId')
  async updateCategoryToProduct(
    @Param('id', ParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return {
      message: 'Product updated',
      data: await this.productService.addCategoryToPorduct(id, categoryId),
    };
  }
  @Delete('/:id')
  async delete(@Param('id', CustomParseIntPipe) id: number) {
    await this.productService.delete(id);
    return {
      message: 'Product deleted',
    };
  }
  @Delete('/:id/category/:categoryId')
  async deleteCategory(
    @Param('id', CustomParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    await this.productService.removeCategoryByProduc(id, categoryId);
    return {
      message: 'Category product deleted',
    };
  }
}
