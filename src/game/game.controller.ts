import {
  Controller,
  Get,
  Request,
  UseGuards,
  Post,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable, of } from 'rxjs';
import { db } from 'data';
import { delay } from 'rxjs/operators';

@Controller('game')
@UseGuards(AuthGuard('jwt'))
export class GameController {
  boardStat = '';

  @Get('list')
  getUsers(@Request() req): Observable<any[]> {
    return of(db.games);
  }

  @Post()
  create(@Body() body, @Request() req) {
    let game: Game = {
      id: '' + db.gameId++,
      name: 'partie de ' + req.user.username + ' (' + db.gameId + ')',
      boardFen: 'start',
      createdBy: req.user.id,
    };
    db.games.push(game);
    return game;
  }
}
