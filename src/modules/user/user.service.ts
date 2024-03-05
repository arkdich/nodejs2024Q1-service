import { Injectable } from '@nestjs/common';
import { User } from './dto/types';
import { CreateUserDto } from './dto/user.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserService {
  private static instance: UserService | null = null;
  private users: User[] = [];

  constructor() {
    if (UserService.instance) {
      return UserService.instance;
    }

    UserService.instance = this;
  }

  async add(data: CreateUserDto) {
    const id = uuid();
    const timestamp = Date.now();

    const user: User = {
      id,
      login: data.login,
      password: data.password,
      version: 1,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    this.users.push(user);

    return user;
  }

  async get(id: string) {
    return this.users.find((user) => user.id === id);
  }

  async getAll() {
    return this.users;
  }

  async delete(id: string) {
    const user = await this.get(id);

    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }

    this.users = this.users.filter((user) => user.id !== id);
  }
}
