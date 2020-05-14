import { Body, Controller, Delete, Get, Logger, NotFoundException, Param, Post, Put, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Chess } from 'chess.js';
import { db } from 'data';
import { DataService } from 'data-service/data.service';
import { Game, GameStatus } from 'model/game.model';
import { Observable, of } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { UserService } from 'users/user.service';
import { WSGateway } from 'ws/ws.gateway';
import { GameService } from './game.service';

@Controller('game')
@UseGuards(AuthGuard('jwt'))
export class GameController {
  private readonly logger = new Logger(GameController.name);
  private mapAsGame = map(res => Object.assign(new Game(), res as Game));
  posChangeObs: Observable<any>;

  constructor(
    private dataService: DataService,
    private userService: UserService,
    private gameService: GameService,
    private wsg: WSGateway,
  ) {
    this.posChangeObs = this.wsg.getGameChange();
    this.posChangeObs
      .pipe(
        filter(x => x),
        this.mapAsGame,
        tap(x => this.handleGameChange(x)),
      )
      .subscribe();
  }

  private handleGameChange(game: Game) {
    let fen = game.position + ' ' + game.turn + ' KQkq - 0 1'; //+game.moveCount;
    if (new Chess(fen).in_checkmate()) {
      game.status = GameStatus.FINISHED_MATE;
    }

    // update game in db
    game = this.gameService.update(game);

    // braodcast change to all clients
    this.wsg.emit('gameChange', game);
  }

  @Get('list')
  getGames(@Request() req): Observable<Game[]> {
    return of(db.games);
  }

  @Get(':id')
  findOne(@Param() params): Game {
    let game = this.gameService.findById(params.id);
    if (!game) {
      throw new NotFoundException();
    }
    return game;
  }

  @Put(':id/join')
  joinpost(@Body() Body, @Request() req, @Param() params): Game {
    const user = this.userService.findById(req.user.userId);
    const game = this.gameService.findById(params.id);
    game.blackPlayer = user;
    game.status = GameStatus.STARTED;

    return game;
  }

  @Delete(':id')
  delete(@Body() Body, @Request() req, @Param() params) {
    const user = this.userService.findById(req.user.userId);
    const game = this.gameService.findById(params.id);

    if (!!user) {
      throw new NotFoundException('user not found');
    }
    if (!!game) {
      throw new NotFoundException('game not found');
    }

    if (game.createdBy.userId !== user.userId)
      throw new UnauthorizedException('not your game');

    if (game.status !== GameStatus.OPEN)
      throw new UnauthorizedException('status not OPEN');

    this.dataService.deleteGame(game.id);
  }

  @Post()
  async create(@Request() req) {
    const user: User = await this.userService.findById(req.user.userId);
    const game = new Game(
      '' + db.gameId++,
      'partie de ' + req.user.username + ' (' + db.gameId + ')',
      user,
    );
    db.games.push(game);

    return game;
  }
}
