import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async create(createOrderDto: CreateOrderDto & { client_id: number }) {
    const productsIds = createOrderDto.items.map((item) => item.product_id);
    const uniqueProductsIds = [...new Set(productsIds)];
    const products = await this.productRepo.findBy({
      id: In(uniqueProductsIds),
    });

    if (products.length !== uniqueProductsIds.length) {
      throw new Error(
        'Some products were not found. Found: ' +
          products +
          ' Expected: ' +
          uniqueProductsIds,
      );
    }

    const order = Order.create({
      client_id: createOrderDto.client_id,
      items: createOrderDto.items.map((item) => {
        const product = products.find((p) => p.id === item.product_id);
        return {
          product_id: item.product_id,
          quantity: item.quantity,
          price: product.price,
        };
      }),
    });
    // const order = this.orderRepo.create(createOrderDto);
    return this.orderRepo.save(order);
  }

  findAll(client_id: number) {
    return this.orderRepo.find({
      where: { client_id },
      order: {
        created_at: 'DESC',
      },
    });
  }

  findOne(id: string, client_id: number) {
    return this.orderRepo.findOneByOrFail({
      id,
      client_id,
    });
  }
}
