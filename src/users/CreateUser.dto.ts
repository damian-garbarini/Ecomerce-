import { ApiHideProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsNumber,
  MinLength,
  MaxLength,
  Matches,
  IsOptional,
  IsEmpty,
} from 'class-validator';
import { MatchPassword } from 'src/decorator/validatePassword.decorator';
import { Order } from 'src/orders/orders.entity';

export class CreateUserDto {
  /**
   * Debe ser un string entre 3 y 80 caracteres
   * @example 'TestUsuario01'
   */

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  name: string;

  /**
   * Debe ser un email
   * @example 'TestUsuario01@ejemplo.com'
   */
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**
   * Debe ser una Contraseña entre 8 y 15 caracteres, al menos una letra mayúscula, una letra minúscula, un número y un caracter especial
   * @example 'TEstuser@01'
   */
  @IsNotEmpty()
  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/,
  )
  password: string;

  /**
   * Debe la misma contraseña
   * @example 'TEstuser@01'
   */
  @IsNotEmpty()
  @MatchPassword('password', { message: 'Las contraseñas no coinciden' })
  confirmPassword: string;

  /**
   * Debe ser un string entre 3 y 80 caracteres
   * @example 'ejemplo calle 123'
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  address: string;

  /**
   * Debe ser un numero telefonico
   * @example '123456789'
   */
  @IsNotEmpty()
  @IsNumber()
  phone: number;

  /**
   * Debe ser un string entre 4 y 20 caracteres
   * @example 'Argentina'
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  country: string;

  /**
   * Debe ser un string entre 3 y 80 caracteres
   * @example 'Buenos Aires'
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  city: string;

  @ApiHideProperty()
  @IsEmpty()
  isAdmin?: boolean;

  @ApiHideProperty()
  @IsOptional()
  orders: Order[];
}
