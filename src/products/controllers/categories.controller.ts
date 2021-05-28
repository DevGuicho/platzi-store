import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';

import { CategoriesService } from '../services/categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  async findAll() {
    return await {
      message: 'Categories listed',
      data: await this.categoriesService.findAll(),
    };
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return {
      message: 'Category retrieved',
      data: await this.categoriesService.findOne(id),
    };
  }

  @Post()
  async create(@Body() payload: CreateCategoryDto) {
    return {
      message: 'Category created',
      data: await this.categoriesService.create(payload),
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCategoryDto,
  ) {
    return {
      message: 'Category updated',
      data: await this.categoriesService.update(id, payload),
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return {
      message: 'CAtegory deleted',
      data: await this.categoriesService.remove(id),
    };
  }
}
