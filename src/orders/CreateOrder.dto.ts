import { ArrayNotEmpty, IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { Product } from 'src/products/products.entity';

export class CreateOrderDto {
  /**
   * Debe ser un id de tipo uuid
   * @example 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
   */
  @IsNotEmpty()
  @IsUUID(4)
  userId: string;

  /**
   *  Debe ser un array de id de productos
   * @example '[{'f47ac10b-58cc-4372-a567-0e02b2c3d479'},
   * {'f47ac10b-58cc-4372-a567-0e02b2c3d479'}]'
   */
  @IsArray()
  @ArrayNotEmpty()
  products: Partial<Product[]>;
}
