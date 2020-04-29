import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable, of } from 'rxjs';
import { ExtractJwt } from 'passport-jwt';

@Controller('game')
@UseGuards(AuthGuard('jwt'))
export class GameController {
  games = [
    { name: 'partie alex', id: '45' },
    { name: 'partie toto', id: '15' },
  ];

  @Get('list')
  getUsers(@Request() req): Observable<any[]> {
    return of(this.games);
  }
}
