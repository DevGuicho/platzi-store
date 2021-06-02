import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { ProductsService } from 'src/products/services/products.service';
import { CustomersService } from 'src/users/services/customers.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    private customerService: CustomersService,
    @InjectRepository(User) private userRespo: Repository<User>,
  ) {}

  async findAll() {
    return await this.userRespo.find({ relations: ['customer'] });
  }

  async findOne(id: number) {
    const user = await this.userRespo.findOne(id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string) {
    return await this.userRespo.findOne({ where: { email } });
  }

  async create(data: CreateUserDto) {
    const newUser = this.userRespo.create(data);
    const hashPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashPassword;
    if (data.customerId) {
      const customer = await this.customerService.findOne(data.customerId);
      newUser.customer = customer;
    }

    return await this.userRespo.save(newUser);
  }

  async update(id: number, changes: UpdateUserDto) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    this.userRespo.merge(user, changes);
    return await this.userRespo.save(user);
  }

  async remove(id: number) {
    const user = await this.userRespo.findOne(id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return await this.userRespo.delete(id);
  }
  async getOrdersByUser(id: number) {
    const user = this.userRespo.findOne(id);
    return {
      date: new Date(),
      user,
      products: await this.productsService.findAll(),
    };
  }
}
