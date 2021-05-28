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

import { BrandsService } from '../services/brands.service';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
  constructor(private brandsService: BrandsService) {}

  @Get()
  async findAll() {
    return {
      message: 'Brands listed',
      data: await this.brandsService.findAll(),
    };
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return {
      message: 'Brand retrieved',
      data: await this.brandsService.findOne(id),
    };
  }

  @Post()
  async create(@Body() payload: CreateBrandDto) {
    return {
      message: 'Brand created',
      data: await this.brandsService.create(payload),
    };
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateBrandDto,
  ) {
    return this.brandsService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.brandsService.remove(+id);
  }
}
