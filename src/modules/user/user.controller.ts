import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { validate } from 'uuid';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  async get(@Param('id') id: string) {
    const isValid = validate(id);

    if (!isValid) {
      throw new Error('Invalid id');
    }

    const user = await this.userService.get(id);

    return user;
  }

  @Get()
  async getAll() {
    const users = await this.userService.getAll();

    return users;
  }

  @Post()
  async create(@Body() body: CreateUserDto) {
    const user = await this.userService.add(body);

    return user;
  }
}
