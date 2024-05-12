import {
  IsEmail,
  IsString,
  IsNumber,
  MinLength,
  MaxLength,
  Matches,
  Length,
  IsOptional,
} from 'class-validator';

export class UpdateUserDto {
  /**
   * Debe ser un string entre 3 y 80 caracteres
   * @example 'TestUsuario01'
   */
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  name: string;

  /**
   * Debe ser un email
   * @example 'TestUsuario01@ejemplo.com'
   */
  @IsOptional()
  @IsEmail()
  email: string;

  /**
   * Debe ser una Contraseña entre 8 y 15 caracteres, al menos una letra mayúscula, una letra minúscula, un número y un caracter especial
   * @example 'TEstuser@01'
   */
  @IsOptional()
  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/,
  )
  password: string;

  /**
   * Debe ser un string entre 3 y 80 caracteres
   * @example 'ejemplo calle 123'
   */
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  address: string;

  /**
   * Debe ser un numero telefonico
   * @example '123456789'
   */
  @IsOptional()
  @IsNumber()
  @Length(8, 8)
  phone: number;

  /**
   * Debe ser un string entre 4 y 20 caracteres
   * @example 'Argentina'
   */
  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  country: string;

  /**
   * Debe ser un string entre 3 y 80 caracteres
   * @example 'Buenos Aires'
   */
  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  city: string;
}
