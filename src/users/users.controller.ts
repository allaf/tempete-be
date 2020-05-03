import {
  Controller,
  Get,
  Param,
  Request,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { AuthService } from 'auth/auth.service';
import { UsersService } from './users.service';
import { Observable, of } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(
    private readonly service: UsersService,
    private auth: AuthService,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getUsers(): Promise<User[]> {
    return await this.service.findAll();
  }

  @Get('connected')
  getConnectedUsers(@Request() req) {
    return this.auth.loggedInUsers();
  }

  @Get(':id')
  async getUser(@Param() params): Promise<User> {
    return await this.service.findById(params.id);
  }
}
