import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto } from './model/user.dto';
import { UserService } from './user.service';
import { User } from './model/user_d';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  async get(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Omit<User, 'password'>> {
    try {
      const user = await this.userService.get(id);

      return {
        id: user.id,
        login: user.login,
        version: user.version,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get()
  async getAll(): Promise<Omit<User, 'password'>[]> {
    const users = await this.userService.getAll();

    return users.map((user) => ({
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));
  }

  @Post()
  async create(@Body() body: CreateUserDto) {
    const user = await this.userService.add(body);

    return user;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      await this.userService.delete(id);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdatePasswordDto,
    @Res() res: Response,
  ) {
    try {
      const user = await this.userService.get(id);

      if (user.password !== body.oldPassword) {
        res.status(HttpStatus.FORBIDDEN).json({
          statusCode: HttpStatus.FORBIDDEN,
          message: 'Old password is incorrect',
        });

        return;
      }

      const updatedUser = await this.userService.update(id, body.newPassword);

      res.status(HttpStatus.OK).json(updatedUser);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }
}
