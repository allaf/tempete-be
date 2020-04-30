import { Controller, Get, Param, Request } from '@nestjs/common';
import { AuthService } from 'auth/auth.service';
import { UsersService } from './users.service';
import { Observable, of } from 'rxjs';

@Controller('users')
// @UseGuards(AuthGuard('jwt')) //TODO ssss
//TODO fix tslint
export class UsersController {
  constructor(
    private readonly service: UsersService,
    private auth: AuthService,
  ) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return await this.service.findAll();
  }

  @Get('connected')
  getConnectedUsers(@Request() req): Observable<User[]> {
    return of(
      Object.values(req.sessionStore.sessions).map(
        x => JSON.parse(x + '')['passport']['user'],
      ),
    );
  }

  @Get(':id')
  async getUser(@Param() params): Promise<User> {
    return await this.service.findById(params.id);
  }
}
