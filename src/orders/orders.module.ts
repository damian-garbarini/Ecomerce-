import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrdersRepository } from './orders.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { OrderDetails } from './ordersDetail.entity';
import { Order } from './orders.entity';
import { Product } from 'src/products/products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, User, OrderDetails, Product])],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
})
export class OrdersModule {}
