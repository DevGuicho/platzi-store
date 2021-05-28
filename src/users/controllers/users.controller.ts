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

import { UsersService } from '../services/users.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll() {
    return {
      message: 'Users listed',
      data: await this.usersService.findAll(),
    };
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return {
      message: 'User retrieved',
      data: await this.usersService.findOne(id),
    };
  }
  @Get(':id/orders')
  getOrders(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getOrdersByUser(id);
  }

  @Post()
  async create(@Body() payload: CreateUserDto) {
    return {
      message: 'User created',
      data: await this.usersService.create(payload),
    };
  }

  @Put('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDto,
  ) {
    return {
      message: 'User updated',
      data: await this.usersService.update(id, payload),
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.usersService.remove(id);
    return {
      message: 'User deleted',
    };
  }
}
