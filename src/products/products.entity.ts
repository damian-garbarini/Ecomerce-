import { Category } from 'src/categories/categories.entity';
import { OrderDetails } from 'src/orders/ordersDetail.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'products',
})
export class Product {
  /**
   * @example 'uuid v4 que se genera automaticamente'
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * debe ser un string con un maximo de 50
   * @example 'nombreEjemplo'
   */
  @Column({ length: 50, unique: true })
  name: string;

  /**
   * debe ser un string
   * @example 'uuid v4 que se genera automaticamente'
   */
  @Column({ type: 'text' })
  description: string;

  /**
   * debe ser un decimal
   * @example '10.00'
   */
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  /**
   * Debe ser un numero
   * @example '12'
   */
  @Column()
  stock: number;

  /**
   * debe ser un string
   * @example 'https://st4.depositphotos.com/14953852/22772/v/450/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg'
   */
  @Column({
    default:
      'https://st4.depositphotos.com/14953852/22772/v/450/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg',
  })
  imgUrl: string;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToMany(() => OrderDetails, (orderDetails) => orderDetails.products)
  orderDetails: OrderDetails[];
}
