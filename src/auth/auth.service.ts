import { UsersRepository } from 'src/users/users.repository';
import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/CreateUser.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signin(email: string, password: string) {
    const userFind = await this.usersRepository.getUserByEmail(email);
    if (!userFind) throw new BadRequestException('Credenciales incorrectas');

    const passwordMatch = await bcrypt.compare(password, userFind.password);
    if (!passwordMatch)
      throw new BadRequestException('Credenciales incorrectas');

    const payload = {
      id: userFind.id,
      email: userFind.email,
      isAdmin: userFind.isAdmin,
    };

    const token = this.jwtService.sign(payload);

    return { message: 'Usuario Logueado correctamente', token };
  }

  async signUp(user: CreateUserDto) {
    const userFind = await this.usersRepository.getUserByEmail(user.email);
    if (userFind) throw new BadRequestException('El usuario ya existe');

    const passwordHash = await bcrypt.hash(user.password, 10);
    if (!passwordHash)
      throw new BadRequestException('No se pudo hashear la contraseña');

    const { confirmPassword, ...userCreate } = user;
    const userCreated = await this.usersRepository.addUser({
      ...userCreate,
      password: passwordHash,
    });
    return { message: 'Usuario creado', userCreated };
  }
}
