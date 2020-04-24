import { Controller, Get } from '@nestjs/common';
import { Observable, of } from 'rxjs';

@Controller('game')
export class GameController {
  games = [
    { name: 'partie alex', id: '45' },
    { name: 'partie toto', id: '15' },
  ];

  @Get('list')
  getUsers(): Observable<any[]> {
    return of(this.games);
  }
}

