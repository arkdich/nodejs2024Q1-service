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

    const user = {
      id,
      createdAt: timestamp,
      updatedAt: timestamp,
      version: 1,
      ...data,
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
}
