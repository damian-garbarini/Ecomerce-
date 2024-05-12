import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './orders.entity';
import { Product } from 'src/products/products.entity';
import { v4 as uuid } from 'uuid';
@Entity({
  name: 'orders_details',
})
export class OrderDetails {
  /**
   * @example 'uuid v4 que se genera automaticamente'
   */
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  /**
   * Debe ser un decimal
   * @example '10.00'
   */
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @OneToOne(() => Order, (order) => order.orderDetails)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToMany(() => Product)
  @JoinTable({
    name: 'orderDetails_products',
    joinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'orderDetail_id',
      referencedColumnName: 'id',
    },
  })
  products: Product[];
}
