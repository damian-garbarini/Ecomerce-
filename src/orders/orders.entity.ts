import { User } from 'src/users/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderDetails } from './ordersDetail.entity';
import { v4 as uuid } from 'uuid';
@Entity({
  name: 'orders',
})
export class Order {
  /**
   * @example 'uuid v4 que se genera automaticamente'
   */
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  /**
   * Debe ser una fecha del tipo dd/mm/yy
   * @example '18/12/2022'
   */
  @Column()
  date: Date;

  @OneToOne(() => OrderDetails, (orderDetails) => orderDetails.order)
  orderDetails: OrderDetails;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
