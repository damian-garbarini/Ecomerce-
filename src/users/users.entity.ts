import { Order } from 'src/orders/orders.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'users',
})
export class User {
  /**
   * @example 'uuid v4 que se genera automaticamente'
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * debe ser un string con un maximo de 50 caracteres
   * @example 'nombreEjemplo'
   */
  @Column({ type: 'varchar', length: 50 })
  name: string;

  /**
   * Debe ser un email
   * @example 'TestUsuario01@ejemplo.com'
   */
  @Column({ length: 50, unique: true })
  email: string;

  /**
   * Debe ser una contraseña de maximo 80 caracteres
   * @example 'TEstuser@01'
   */
  @Column({ length: 80 })
  password: string;

  /**
   * Debe ser un numero telefonico
   * @example '123456789'
   */
  @Column()
  phone: number;

  /**
   * Debe ser un string maximo de 50 caracteres
   * @example 'Argentina'
   */
  @Column({ length: 50 })
  country: string;

  /**
   * Debe ser un string
   * @example 'ejemplo calle 123'
   */
  @Column()
  address: string;

  /**
   * Debe ser un string maximo de 50 caracteres
   * @example 'Buenos Aires'
   */
  @Column({ length: 50 })
  city: string;

  /**
   * Debe ser un boolean por default en false
   * @example 'false'
   */
  @Column({ default: false })
  isAdmin: boolean;

  @OneToMany(() => Order, (order) => order.user)
  @JoinColumn({ name: 'order_id' })
  orders: Order[];
}
