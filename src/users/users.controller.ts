import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { UserService } from './user.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly service: UserService,
    private auth: AuthService,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getUsers(): Promise<User[]> {
    return await this.service.findAll();
  }

  @Get('connected')
  getConnectedUsers() {
    return this.auth.loggedInUsers();
  }

  @Get(':id')
  async getUser(@Param() params): Promise<User> {
    return await this.service.findById(params.id);
  }
}
