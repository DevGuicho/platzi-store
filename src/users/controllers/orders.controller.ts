import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';
import { OrdersService } from '../services/orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @Get()
  async findAll() {
    return {
      message: 'orders listed',
      data: await this.orderService.findAll(),
    };
  }
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return {
      message: 'Order retrieved',
      data: await this.orderService.findOne(id),
    };
  }
  @Post()
  async create(@Body() payload: CreateOrderDto) {
    return {
      message: 'Order created',
      data: await this.orderService.create(payload),
    };
  }
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateOrderDto,
  ) {
    return {
      message: 'Order update',
      data: await this.orderService.update(id, payload),
    };
  }
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return {
      message: 'Order deleted',
      data: await this.orderService.remove(id),
    };
  }
}
