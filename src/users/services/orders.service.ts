import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';
import { Customer } from '../entities/customer.entity';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
  ) {}

  async findAll() {
    return await this.orderRepo.find();
  }

  async findOne(orderId: number) {
    const order = await this.orderRepo.findOne(orderId, {
      relations: ['items', 'items.product'],
    });
    if (!order) {
      throw new NotFoundException(`Order #${orderId} not found`);
    }
    return order;
  }

  async create(data: CreateOrderDto) {
    const customer = await this.customerRepo.findOne(data.customerId);
    const order = this.orderRepo.create();
    order.customer = customer;

    return this.orderRepo.save(order);
  }

  async update(id: number, changes: UpdateOrderDto) {
    const order = await this.orderRepo.findOne(id);
    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }
    const customer = await this.customerRepo.findOne(changes.customerId);
    order.customer = customer;
    return await this.orderRepo.save(order);
  }
  async remove(id: number) {
    await this.findOne(id);
    return this.orderRepo.delete(id);
  }
}
