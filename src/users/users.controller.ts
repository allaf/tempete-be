import { Controller, Get, Inject, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

  constructor(private readonly service: UsersService) { }

  @Post()
  addUser() {
    // this.service.add({});
  }

  @Get()
  async getUsers(): Promise<User[] > {
    return await this.service.findAll();
  }

}
