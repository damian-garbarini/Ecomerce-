import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getAllUsers(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const users = await this.userRepository.find({
      take: limit,
      skip: skip,
    });
    return users.map(({ password, ...userNoPassword }) => userNoPassword);
  }

  async getUserById(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: {
        orders: true,
      },
    });
    if (!user)
      throw new NotFoundException(`No se encuentra el usuario con el id ${id}`);
    const { password, ...userNoPassword } = user;
    return userNoPassword;
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  async addUser(user: Partial<User>) {
    const newUser = await this.userRepository.save(user);
    const { password, isAdmin, ...userNoPassword } = newUser;
    return userNoPassword;
  }

  async updateUser(id: string, user: Partial<User>) {
    await this.userRepository.update(id, user);
    const userUpdated = await this.userRepository.findOneBy({ id });
    const { password, ...userNoPassword } = userUpdated;
    return userNoPassword;
  }

  async deleteUser(id: string) {
    const userDeleted = await this.userRepository.findOneBy({ id });
    if (!userDeleted)
      throw new NotFoundException(`No se encuentra el usuario con el id ${id}`);

    this.userRepository.remove(userDeleted);
    const { password, ...userNoPassword } = userDeleted;
    return userNoPassword;
  }
}
