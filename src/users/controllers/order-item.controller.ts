import { Body, Controller, Post } from '@nestjs/common';
import { CreateOrderItemDto } from '../dtos/order-item.dto';
import { OrderItemService } from '../services/order-item.service';

@Controller('order-item')
export class OrderItemController {
  constructor(private itemsService: OrderItemService) {}
  @Post()
  async create(@Body() payload: CreateOrderItemDto) {
    return {
      message: 'Order item added',
      data: await this.itemsService.create(payload),
    };
  }
}
