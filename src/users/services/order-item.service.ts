import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';
import { CreateOrderItemDto } from '../dtos/order-item.dto';
import { OrderItem } from '../entities/order-item.entity';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem) private itemRepo: Repository<OrderItem>,
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}
  async create(payload: CreateOrderItemDto) {
    const order = await this.orderRepo.findOne(payload.orderId);
    const product = await this.productRepo.findOne(payload.productId);
    const item = this.itemRepo.create({
      order,
      product,
      quantity: payload.quantity,
    });
    return await this.itemRepo.save(item);
  }
}
