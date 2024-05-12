import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './orders.entity';
import { OrderDetails } from './ordersDetail.entity';
import { User } from 'src/users/users.entity';
import { Product } from 'src/products/products.entity';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    @InjectRepository(OrderDetails)
    private readonly orderDetailsRepository: Repository<OrderDetails>,
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async addOrder(userId: string, products: any) {
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user)
      throw new NotFoundException(
        `No se encuentra el usuario con el id ${userId}`,
      );

    let total = 0;
    const productsArray = await Promise.all(
      products.map(async (product) => {
        const productFound = await this.productsRepository.findOneBy({
          id: product.id,
        });

        if (!productFound)
          throw new NotFoundException(
            `No se encuentra el usuario con el id ${product.id}`,
          );

        if (productFound.stock < 1)
          throw new NotFoundException(`No hay stock de ${productFound.name}`);

        total += Number(productFound.price);

        await this.productsRepository.update(
          { id: product.id },
          { stock: productFound.stock - 1 },
        );

        return productFound;
      }),
    );

    const order = new Order();
    order.date = new Date();
    order.user = user;
    const orderSaved = await this.ordersRepository.save(order);

    const orderDetails = new OrderDetails();
    orderDetails.price = Number(Number(total).toFixed(2));
    orderDetails.order = orderSaved;
    orderDetails.products = productsArray;

    await this.orderDetailsRepository.save(orderDetails);

    return await this.ordersRepository.find({
      where: { id: orderSaved.id },
      relations: {
        orderDetails: true,
      },
    });
  }

  async getOrder(id: string) {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: {
        orderDetails: {
          products: true,
        },
      },
    });
    if (!order)
      throw new NotFoundException(`No se encuentra la ordencon el id ${id}`);

    return order;
  }
}
7;
