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
import { Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { UserEntity } from './model/user.entity';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  async get(@Param('id', new ParseUUIDPipe()) id: string): Promise<UserEntity> {
    try {
      const user = await this.userService.get(id);

      return user;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get()
  async getAll(): Promise<UserEntity[]> {
    const users = await this.userService.getAll();

    return users;
  }

  @Post()
  async create(@Body() body: CreateUserDto): Promise<UserEntity> {
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
  ): Promise<UserEntity> {
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

      res.status(HttpStatus.OK).json(instanceToPlain(updatedUser));
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }
}
