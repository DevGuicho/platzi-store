import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from '../entities/product.entity';
import {
  CreateProductDto,
  UpdateProductDto,
} from 'src/products/dtos/products.dto';
import { BrandsService } from './brands.service';
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    private brandService: BrandsService,
  ) {}

  async findAll() {
    return await this.productRepo.find({ relations: ['brand'] });
  }
  async findOne(id: number) {
    const product = await this.productRepo.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }
  async create(payload: CreateProductDto) {
    const newProduct = this.productRepo.create(payload);

    const brand = await this.brandService.findOne(payload.brandId);
    newProduct.brand = brand;

    return await this.productRepo.save(newProduct);
  }
  async update(id: number, payload: UpdateProductDto) {
    const product = await this.productRepo.findOne(id);

    if (payload.brandId) {
      const brand = await this.brandService.findOne(payload.brandId);
      product.brand = brand;
    }

    await this.productRepo.merge(product, payload);

    return await this.productRepo.save(product);
  }
  async delete(id: number) {
    const product = await this.productRepo.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return await this.productRepo.delete(id);
  }
}
