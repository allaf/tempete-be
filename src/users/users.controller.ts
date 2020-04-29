import { Controller, Get, Inject, Post, UseGuards, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
// @UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return await this.service.findAll();
  }

  @Get(':id')
  async getUser(@Param() params): Promise<User> {
    return await this.service.findById(params.id);
  }
}
