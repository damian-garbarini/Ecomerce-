import {
  Body,
  Controller,
  Get,
  ParseUUIDPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './CreateOrder.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(AuthGuard)
  addOrder(@Body() order: CreateOrderDto) {
    const { userId, products } = order;
    return this.ordersService.addOrder(userId, products);
  }

  @Get()
  getOrder(@Query('id', ParseUUIDPipe) id: string) {
    return this.ordersService.getOrder(id);
  }
}
