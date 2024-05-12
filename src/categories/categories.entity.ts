import { Product } from 'src/products/products.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'categories',
})
export class Category {
  /**
   * @example 'uuid v4 que se genera automaticamente'
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * debe ser un string con un maximo de 50
   * @example 'nombreEjemplo'
   */
  @Column({ length: 50, unique: true, nullable: false })
  name: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
