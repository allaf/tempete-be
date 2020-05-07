import {
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
  Body,
  Logger,
  Put,
  Delete,
  NotImplementedException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { db } from 'data';
import { Game, GameStatus } from 'model/game.model';
import { Observable, of } from 'rxjs';
import { UsersService } from 'users/users.service';
import { GameService } from './game.service';
import { globalAgent } from 'http';
import { DataService } from 'data-service/data.service';

@Controller('game')
@UseGuards(AuthGuard('jwt'))
export class GameController {
  private readonly logger = new Logger(GameController.name);

  boardStat = '';

  constructor(
    private dataservice: DataService,
    private userService: UsersService,
    private gameService: GameService,
  ) {}

  @Get('list')
  getGames(@Request() req): Observable<Game[]> {
    return of(db.games);
  }

  @Get(':id')
  findOne(@Param() params): Game {
    db.games.find(g => g.id === params.id);
    return db.games.find(g => g.id === params.id);
  }

  @Put(':id/join')
  joinpost(@Body() Body, @Request() req, @Param() params): Game {
    this.logger.debug('join appelé');
    const user = this.userService.findById(req.user.userId);
    const game = this.gameService.findById(params.id);
    game.blackPlayer = user;
    game.status = GameStatus.STARTED;

    return game;
  }

  @Delete(':id')
  delete(@Body() Body, @Request() req, @Param() params) {
    this.logger.debug('delete appelé');
    const user = this.userService.findById(req.user.userId);
    const game = this.gameService.findById(params.id);

    // TODO service

    // TODO game not found, user not found 404
    if (game.createdBy.userId !== user.userId)
      throw new UnauthorizedException('not your game');

    if (game.status !== GameStatus.OPEN)
      throw new UnauthorizedException('status not OPEN');

    this.dataservice.deleteGame(game.id);
  }

  @Post()
  async create(@Request() req) {
    const user: User = await this.userService.findById(req.user.userId);
    let game: Game = {
      status: GameStatus.OPEN,
      name: 'partie de ' + req.user.username + ' (' + db.gameId + ')',
      id: '' + db.gameId++,
      boardFen: 'start',
      createdBy: user,
      whitePlayer: user,
    };
    db.games.push(game);

    return game;
  }
}