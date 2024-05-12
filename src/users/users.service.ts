import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  getAllUsers(page: number, limit: number) {
    const users = this.usersRepository.getAllUsers(page, limit);
    return users;
  }

  getUserById(id: string) {
    return this.usersRepository.getUserById(id);
  }

  addUser(user: Partial<User>) {
    return this.usersRepository.addUser(user);
  }

  updateUser(id: string, user: Partial<User>) {
    return this.usersRepository.updateUser(id, user);
  }

  deleteUser(id: string) {
    return this.usersRepository.deleteUser(id);
  }
}
