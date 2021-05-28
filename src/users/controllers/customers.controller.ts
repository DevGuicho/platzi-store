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

import { CustomersService } from '../services/customers.service';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';

@Controller('customers')
export class CustomerController {
  constructor(private customersService: CustomersService) {}

  @Get()
  async findAll() {
    return {
      message: 'Customers listed',
      data: await this.customersService.findAll(),
    };
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return {
      message: 'Customer retrieved',
      data: await this.customersService.findOne(id),
    };
  }

  @Post()
  async create(@Body() payload: CreateCustomerDto) {
    return {
      message: 'Customer created',
      data: await this.customersService.create(payload),
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCustomerDto,
  ) {
    return {
      message: 'Customer updated',
      data: await this.customersService.update(id, payload),
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.customersService.remove(id);
    return {
      message: 'Customer deleted',
    };
  }
}
